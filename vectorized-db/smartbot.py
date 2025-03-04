import json
import requests
import re
import openai
import mysql.connector
from mysql.connector import Error
from datetime import datetime
from fastapi import FastAPI
from pydantic import BaseModel
import os
from dotenv import load_dotenv

app = FastAPI()

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

db_config = {
    "host": os.getenv("DB_HOST"),
    "port": int(os.getenv("DB_PORT", 3306)),  
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_NAME"),
}

data_json = {}
with open("./data/imart.json", "r") as file:
    data_json = json.load(file) 


SCHEMA = json.dumps(data_json)
# print(SCHEMA)

class ChatRequest(BaseModel):
    question: str

@app.get("/")
def chat(request: ChatRequest):
    question = request.question
    triate_data = triage(question)
    result = chatDirector(question, triate_data['queryType'])

    print(result)
    return result

def chatDirector(question, queryType):
    if queryType == "DATA_QUESTION":
        return dataQuestion(question)
    elif queryType == "GENERAL_QUESTION":
        return generalQuestion(question)
    elif queryType == "OUT_OF_SCOPE":
        return outOfScope()
    else:
        return "No Answer could be generated."

# ===============================================
# Triage
def triage(question):
    print("Excecuting Triage ======================\n")

    system_prompt = """You are a query classifier that categorizes questions into three types. Users are expected to ask questions about various tables in our database. The database belongs to IMART, an eccomerce website where user can buy products. However, they may also ask general questions that relate to data analysis or IMART in general. We want to classify questions unrelated to data analysis as "OUT_OF_SCOPE".
    GENERAL_QUESTION: The question is not related to data analysis or the IMART database, but it can still be answered directly by an AI. Example:
    - "What is IMART?"  
    - "How does eCommerce work?"  
    - "What is data analysis?"
    DATA_QUESTION: Questions or tasks that are related to data analysis or the IMART database. Note that this can be answered or executed by querying the database. Example:
    - "Show me the top 10 most sold products."  
    - "What is the total revenue for the last month?"  
    - "How many users have made a purchase in the last week?"
    OUT_OF_SCOPE: The question is not related to data analysis and cannot be answered directly by an AI. These questions often require real-time, external, or subjective knowledge that is outside the AI's scope. Example;
    - "What is my current order status?" (Requires real-time tracking)  
    - "Can I return my order?" (Policy-specific and case-dependent)  
    Respond in JSON format matching this schema:
    {
    "queryType": "GENERAL_QUESTION" | "DATA_QUESTION" | "OUT_OF_SCOPE",
    "explnation": "string"
    },
    """

    user_prompt = f"""
    Question:
    {question}
    """

    data = requestAi(system_prompt, user_prompt)
    print("Triage Result: " , data['queryType'])
    print("FINISHING Triage ======================\n")
    return data 

# ===============================================
# Out of Scope
def outOfScope():
    return "I'm sorry, your question is out of scope. I can only answer questions related to data analysis or the IMART database."

# ===============================================
# General Question

def generalQuestion(question):
    print("Excecuting General Question ======================\n")

    system_prompt = """
    You are a helpful data analysis expert.
    Provide clear, accurate answers about data and SQL/querying concepts.
    Use examples when helpful and maintain a professional tone.
    Respond in JSON format matching this schema:
    {
    "answer": "string"
    }   
    """

    user_prompt = f"""
    Please answer this question: 
    {question}
    """

    data = requestAi(system_prompt, user_prompt)
    print("General Question Result: " , data['answer'])
    print("FINISHING General Question ======================\n")
    return data['answer']

# ===============================================
# Data Question
def dataQuestion(question):
    print("Excecuting Data Question ======================\n")
    max_attempt = 3
    error = ""
    hasFailed = False
    prev_query = ""

    schema_analysis_data = {}

    schema_analysis_data = schemaAnalysis(question)
    if str(schema_analysis_data['inScope']).lower() == "false":
        return "Sorry, the question is out of scope. Reason: " + schema_analysis_data['outOfScopeReason']

    for attempt in range(max_attempt):
        generate_query_data = {}
        if(hasFailed):
            generate_query_data = regenerateQuery(question, schema_analysis_data, prev_query, error)
        else:
            generate_query_data = generateQuery(question, schema_analysis_data)

        query_result_data = json.loads(executeQuery(generate_query_data['query']))
        # print("Query Result: ", query_result_data["message"])

        if str(query_result_data["success"]).lower() == "false":
            print("Query failed")
            error = query_result_data["message"]
            prev_query = generate_query_data['query']
            hasFailed = True
            continue

        format_answer = formatAnswer(question, generate_query_data['query'], query_result_data["message"])
        print("FINISHING Data Question ======================\n")
        return format_answer['answer']
    
    print("No Answer can be Generated")
    return "Sorry, we don't have an answer for your question."

def schemaAnalysis(question):
    print("Excecuting Schema Analysis ======================\n")

    system_prompt = """
    You are a database schema analyst.
    Currently your in a analysis pipeline that ONLY identify table, fields, relationships, etc. You cant generate sql and dont have to answer it directly. But you must provide relevant tables, fields, relationships, etc.
    Analyze which tables and fields would be needed to answer the user's question.
    Ensure that relevent tables and fields exist in the schema.
    If the question cannot be answered with the available tables, respond with inScope set to false.
    If inScope is false, provide a reason in the outOfScopeReason field.
    If the answer can be answered with the available tables, respond with inScope set to true and
    list the relevant tables and fields in the relevantTables array.
    List any join keys and relationships in the relationships array with strings like "table1.id = table2.id".
    Do not assume table, field, or relationship names. You must perfectly follow the given schema analysis.

    In-scope (inscope: true):
    - Queries that involve **SELECT**  
    - Provide an empty list for `relevantTables` and `relationships` if they are not detected.

    Out-of-Scope (`inScope: false`) 
    - Queries that involve **DROP, DELETE, ALTER, CREATE, UPDATE, INSERT** or any other quries that are not **SELECT**.  
    - Explain why the query is out of scope in `outOfScopeReason`.

    Respond in JSON format matching this schema only for the final answer:
    {
    "inScope": boolean,
    "outOfScopeReason": string,
    "relevantTables": [
        {
            "tableName": "string",
            "fields": string[],
            "reason": "string"
        }
        ],
        "relationships": string[],
    }"""

    user_prompt = f"""
    Available Schema:
    {SCHEMA}
    
    Question:
    {question}
    """

    data = requestAi(system_prompt, user_prompt)
    print("Schema Analysis Result: " , data)
    print("FINISHING Schema Analysis ======================\n")
    return data

def generateQuery(question, schema_analysis_data):
    print("Excecuting Generate Query ======================\n")
    system_prompt = """
    You are a MySQL query generator. Follow these rules:
    1. Generate precise, efficient MySQL-compliant queries based on schema analysis.
    2. When necessary, use the relationships array to join tables.
    3. Use LIKE for case-insensitive pattern matching in MySQL
    4. For exact matches, use '='.
    5. For partial string matches, use LIKE with '%' wildcards (e.g., column LIKE '%pattern%').
    6. Limit the number of results to 20 whenever a limit is not specified.
    7. Always use only the column names provided in the schema and never reference columns outside of that.
    8. When SELECT is not specify, use * to select all fields
    9. Use MySQL-specific features when appropriate:
    - Use GROUP_CONCAT instead of STRING_AGG for string concatenation.
    - Use DATE_FORMAT instead of DATE_TRUNC for date/time formatting
    - Use Common Table Expressions (WITH statements) when needed.
    10. Ensure the generated query fully answers the user’s question.
    11. Do not assume table, field, or relationship names. You must perfectly follow the given schema analysis.

    You must Respond in JSON format matching this schema only for the final answer:
    {
    "query": "string",
    "explanation": "string"
    }
    """
    user_prompt = f"""
    Using this schema analysis, generate a SQL query:
    {schema_analysis_data}

    Question that needs to be answered:
    {question}
    """

    data = requestAi(system_prompt, user_prompt)
    print("Generate Query Result: ")
    print("query: ", data['query'])
    print("explanation: ", data['explanation'])
    print("FINISHING Generate Query ======================\n")
    return data

def regenerateQuery(question, schema_analysis_data, prev_query, error):
    print("Excecuting Regenerate Query ======================\n")
    system_prompt = """
    You are a MySQL query generator. Follow these rules:
    1. Generate precise, efficient MySQL-compliant queries based on schema analysis.
    2. When necessary, use the relationships array to join tables.
    3. Use LIKE for case-insensitive pattern matching in MySQL
    4. For exact matches, use '='.
    5. For partial string matches, use LIKE with '%' wildcards (e.g., column LIKE '%pattern%').
    6. Limit the number of results to 20 whenever a limit is not specified.
    7. Always use only the column names provided in the schema and never reference columns outside of that.
    8. When SELECT is not specify, use * to select all fields
    9. Use MySQL-specific features when appropriate:
    - Use GROUP_CONCAT instead of STRING_AGG for string concatenation.
    - Use DATE_FORMAT instead of DATE_TRUNC for date/time formatting
    - Use Common Table Expressions (WITH statements) when needed.
    10. Ensure the generated query fully answers the user’s question.
    11. Do not assume table, field, or relationship names. You must perfectly follow the given schema analysis.
    12. Consider the previous query that failed and its error message to avoid similar issues.

    You must Respond in JSON format matching this schema only for the final answer:
    {
    "query": "string",
    "explanation": "string"
    }
    """
    user_prompt = f"""
    Using this schema analysis, generate a SQL query:
    {schema_analysis_data}

    Question that needs to be answered:
    {question}

    previous failed query: {prev_query}
    Error encountered: {error}
    """

    data = requestAi(system_prompt, user_prompt)
    print("Regenerate Query Result: ")
    print("query: ", data['query'])
    print("explanation: ", data['explanation'])

    print("FINISHING Regenerate Query ======================\n")
    return ""

def formatAnswer(question, query, query_result):
    print("Excecuting Format Answer ======================\n")
    system_prompt = """
    You are the SmartBot assistant, a database expert that explains query results in clear, natural language. Provide a concise answer that directly addresses the user's question based on the query results. The answer must be accurate and relevant to the user's question. Note that we use Indonesian format, such as Rp as the currency symbol. However, use English language to answer.

    You must Respond exactly in JSON format matching this schema only for the final answer. Any other symbols or words will cause the test to fail:
    {
    "answer": "string"
    }
    """
    user_prompt = f"""
    Question:
    {question}
    
    SQL Query Used:
    {query}
    
    Query Result:
    {query_result}
    """

    data = requestAi(system_prompt, user_prompt)
    print("Format Answer Result: ", data['answer'])
    print("FINISHING Format Answer ======================\n")
    return data

# ===============================================
def requestAi(system_prompt, user_prompt):
    
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"}
    data = {
        "model": "gpt-4o-mini",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        "temperature": 0.7
    }

    response = requests.post(url, json=data, headers=headers)
    response_json = response.json()
    content = response_json['choices'][0]['message']['content']

    print("Request AI result:\n")
    print(content)
    print("\n\n")

    data= json.loads(content)
    return data

def executeQuery(query):
    try:
        conn = mysql.connector.connect(
            **db_config
        )

        cursor = conn.cursor(buffered=True)
        cursor.execute(query)

        if query.strip().lower().startswith("select"):
            results = cursor.fetchall()
            column_names = [desc[0] for desc in cursor.description]
            formatted_results = []

            for row in results:
                formatted_row = {
                    column_names[i]: (str(value) if isinstance(value, datetime) else value)
                    for i, value in enumerate(row)
                }
                formatted_results.append(formatted_row)

            return json.dumps({"success": True, "message": formatted_results}, indent=4)
        else:
            conn.commit()
            return json.dumps({"success": True, "message": "Query successfully executed"})
        

    except Error as e:
        return json.dumps({"success": False, "message": str(e)})

#================================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port = 8000)