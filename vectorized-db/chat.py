import chromadb
import ollama
import json
import re
import mysql.connector
from mysql.connector import Error
from datetime import datetime

DATA_PATH = r"data"
CHROMA_PATH = r"chroma_db"
chroma_client = chromadb.PersistentClient(path=CHROMA_PATH)
collection = chroma_client.get_or_create_collection(name="imart")
data_json = {}


with open("./data/imart.json", "r") as file:
    data_json = json.load(file) 

data_schema_json = json.dumps(data_json)
# print(data_schema_json)

def chat(question):
    
    print("TRIAGE ON PROCESS ============================================")
    
    triage_json = triage(question)

    if "error" in triage_json:
        print("CHAT -- TRIAGE_JSON ERROR")
        return "Sorry, an error has occured. Please try again!"
    
    print("QUERY TYPE DECISION ON PROCESS ============================================")
    
    query_type = triage_json.get("queryType")

    query_type_decision(query_type, question)

def triage(question):
    print("EXCECUTING TRIAGE =========================================")
    system_prompt = """You are a query classifier that categorizes questions into three types. Users are expected to ask questions about various tables in our database. The database belongs to IMART, an eccomerce website where user can buy products. However, they may also ask general questions that relate to data analysis or IMART in general. We want to classify questions unrelated to data analysis as "OUT_OF_SCOPE".
    Respond in JSON format matching this schema:
    {
    "queryType": "GENERAL_QUESTION" | "DATA_QUESTION" | "OUT_OF_SCOPE"
    },
    """

    user_prompt = f"""
    Question:
    {question}
    """

    raw_content = excecuteAiGeneral(system_prompt, user_prompt)
    json_content = extractJson(raw_content)

    print("FINISHING TRIAGE =========================================")

    return json_content

def query_type_decision(query_type, question):
    if query_type == "GENERAL_QUESTION":
        print("QUERY_TYPE_DECISION -- GENERAL_QUESTION")
        return processGeneralQuestion(question)
    
    elif query_type == "DATA_QUESTION":
        print("QUERY_TYPE_DECISION -- DATA QUESTION")
        return  processDataQuestion(question)
    
    elif query_type == "OUT_OF_SCOPE":
        print("QUERY_TYPE_DECISION -- OUT_OF_SCOPE")
        return "OUT_OF_SCOPE"
    
    else:
        print("QUERY_TYPE_DECISION -- error")
        return "error"
    
def processGeneralQuestion(question):
    print("EXCECUTING General Question =========================================")
    
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
    raw_content = excecuteAiGeneral(system_prompt, user_prompt)

    general_json = extractJson(raw_content)
    
    if "error" in general_json:
        general_json = extractResponseToJson(raw_content)

    if isinstance(general_json, str):
        general_json = json.loads(general_json)

    print("FINISHING General Question =========================================")
    return general_json

def processDataQuestion(question):
    schema_json = {}  # Initialize to avoid UnboundLocalError

    # Step 1
    # Create a Schema Analysis

    for i in range(3):
        print(f"\n ATTEMPT SCHEMA ANALYSIS {i} ===================")  # Fixed print
        schema_json = schemaAnalysis(question)

        if "error" not in schema_json:
            break  # Stop if an error occurs

    if "error" in schema_json:
        print("SCHEMA JSON ERROR")
        return "Sorry, an error has occurred. Please try again!"
    
    if schema_json.get("inScope") is False:  # More robust check
        print("SCHEMA JSON SCOPE FALSE")
        return "Sorry, the question is out of scope"

    error_str = ""
    isError = False
    prev_query = ""

    for i in range (3):
        print(f"ATTEMPT {i} ===============================")
    
        # Step 2
        # Generate a Query based on the schema
        query_json = {}

        if(isError):
            query_json = regenerateQuery(question, schema_json, prev_query, error_str)
        else:
            query_json = generateQuery(question, schema_json)

        

        if "error" in query_json:
            print("QUERY JSON ERROR")
            return "Sorry, an error has occurred. Please try again!"

        # Step 3
        # Verify Query 
        query_str = query_json["query"]
        query_verify = verifyQuery(query_str)
        
        if "error" in query_json:
            print("QUERY VERIFY ERROR")
            return "Sorry, an error has occurred. Please try again!"
        
        #STEP 4
        #Inject SQL

        query_str = query_verify["query"]

        response_exec_query = executeQuery(query_str)
        print(response_exec_query)

        # if response_exec_query.get("success") is False:
        #     isError = True
        #     error_str = response_exec_query.get("error", "Unknown error occurred")
        #     prev_query = query_str
        # else:
        #     break

def schemaAnalysis(question):
    print("EXECUTING Schema Analysis =========================================")
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
    Respond in JSON format matching this schema only for the final answer:
    ```json{
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
    }```"""

    user_prompt = f"""
    Available Schema:
    {data_schema_json}
    
    Question:
    {question}
    """

    raw_content = executeAiCoder(system_prompt, user_prompt)
    schema_json = extractJson(raw_content)

    print("FINISHING Schema Analysis =========================================")
    return schema_json

def generateQuery(question, schema_json):
    print("EXECUTING Generate Query =========================================")
    system_prompt = """
    You are a MySQL query generator. Follow these rules:
    1. Generate precise, efficient MySQL-compliant queries based on schema analysis.
    2. When necessary, use the relationships array to join tables.
    3. Use LIKE for case-insensitive pattern matching in MySQL
    4. For exact matches, use '='.
    5. For partial string matches, use LIKE with '%' wildcards (e.g., column LIKE '%pattern%').
    6. Limit the number of results to 200 whenever a limit is not specified.
    7. Always use only the column names provided in the schema and never reference columns outside of that.
    8. When SELECT is not specify, use * to select all fields
    9. Use MySQL-specific features when appropriate:
    - Use GROUP_CONCAT instead of STRING_AGG for string concatenation.
    - Use DATE_FORMAT instead of DATE_TRUNC for date/time formatting
    - Use Common Table Expressions (WITH statements) when needed.
    10. Ensure the generated query fully answers the user’s question.
    11. Do not assume table, field, or relationship names. You must perfectly follow the given schema analysis.

    You must Respond in JSON format matching this schema only for the final answer:
    ```json{
    "query": "string",
    "explanation": "string"
    }```
    """
    user_prompt = f"""
    Using this schema analysis, generate a SQL query:
    {schema_json}

    Question that needs to be answered:
    {question}
    """

    raw_content = executeAiCoder(system_prompt, user_prompt)
    query_json = extractJson(raw_content)

    print("FINISHING Generate Query =========================================")

    return query_json

def regenerateQuery(question, schema_json, prev_query, error_str):
    print("EXECUTING Regenerate Query =========================================")

    system_prompt = """
    You are a MySQL query generator. You have generated a query that failed. Now you have to fix it according to the given schema, previous query, and error. Follow these rules:
    1. Generate precise, efficient MySQL-compliant queries based on schema analysis.
    2. When necessary, use the relationships array to join tables.
    3. Use LIKE for case-insensitive pattern matching in MySQL
    4. For exact matches, use '='.
    5. For partial string matches, use LIKE with '%' wildcards (e.g., column LIKE '%pattern%').
    6. Limit the number of results to 200 whenever a limit is not specified.
    7. Always use only the column names provided in the schema and never reference columns outside of that.
    8. When SELECT is not specify, use * to select all fields
    9. Use MySQL-specific features when appropriate:
    - Use GROUP_CONCAT instead of STRING_AGG for string concatenation.
    - Use DATE_FORMAT instead of DATE_TRUNC for date/time formatting
    - Use Common Table Expressions (WITH statements) when needed.
    10. Ensure the generated query fully answers the user’s question.
    11. Do not assume table, field, or relationship names. You must perfectly follow the given schema analysis.
    12.  Consider the previous query that failed and its error message to avoid similar issues. 

    You must Respond in JSON format matching this schema only for the final answer:
    ```json{
    "query": "string",
    "explanation": "string"
    }```
    """

    user_prompt = f"""
    Using this schema analysis, generate a SQL query:
    {schema_json}

    Question that needs to be answered: 
    {question}

    Previous failed query: {prev_query}
    Error encountered: {error_str}
    """

    raw_content = executeAiCoder(system_prompt, user_prompt)
    query_json = extractJson(raw_content)

    print("FINISHING Regenerate Query =========================================")
    return query_json

def verifyQuery( query_str):
    print("EXECUTING Verify Query =========================================")

    system_prompt = """
    You are an expert MySQL query analyzer. 
    Your task is to verify the correctness of a given MySQL query based on a predefined database schema. Follow these instructions.
    You must check the given query for any errors. Table, fields, and relationship names must be the same as the given schema. If there's any error, you must generate new query that have the same purpose according to the schema. You dont need to give extra explanation for your answer.
    If previous query is correct, just copied it into the format.

    You must Respond in JSON format matching this schema only for the final answer:
    ```json{
        "query": "string",
        "explanation": "string"
    }```
    """

    user_prompt = f"""
    Available Schema:
    {data_schema_json}

    Previous Query:
    {query_str}
    """

    raw_content = executeAiCoder(system_prompt, user_prompt)
    query_json = extractJson(raw_content)

    print("FINISHING Verify Query =========================================")
    return query_json

def extractJson(raw_content):
    if not raw_content:
        return {"error" : "No content provider"}

    match = re.search(r"```(?:json)?\s*\n?(.*?)\n?```", raw_content, re.DOTALL)

    if match:
        json_str = match.group(1).strip()
    else:
        json_str = raw_content.strip()

    try:
        extracted_json = json.loads(json_str)
        print("Extracted Json:\n", extracted_json)
        return extracted_json 
    except json.JSONDecodeError:
        print("Failed to parse Json:\n", json_str)
        return {"error" : "Invalid Json Parse"}

def extractResponseToJson(raw_content):
    pattern = r"<think>.*?</think>\s*(.*)"
    match = re.search(pattern, raw_content, re.DOTALL)

    if match:
        extracted_content = match.group(1).strip()
        return json.dumps({"answer": extracted_content}) 
    else:
        return json.dumps({"error": "No valid content detected"})

def extractSqlToJson(raw_content):
    match = re.search(r"```sql\s*(.*?)\s*```", raw_content, re.DOTALL)

    if match:
        extracted_content = match.group(1).strip()
        return json.dumps({"query": extracted_content, "explanation" : ""}) 
    else:
        return json.dumps({"error": "No valid content detected"})

def extractRawContent(raw_content):
    pattern = r"<think>.*?</think>\s*(.*)"
    match = re.search(pattern, raw_content, re.DOTALL)

    if match:
        extracted_content = match.group(1).strip()
        return extracted_content

def executeQuery(query):
    
    try:
        conn = mysql.connector.connect(
            host="localhost",
            port=3306,
            user="root",
            password="matthew",
            database="internship"
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

            for x in results:
                print(x)
            return json.dumps({"success": True, "message": formatted_results}, indent=4)
        else:
            conn.commit()
            return json.dumps({"success": True, "message": "Query successfully executed"})
        

    except Error as e:
        print(str(e))
        return json.dumps({"success": False, "error": str(e)})

        


def executeAiCoder(system_prompt, user_prompt):
    response = ollama.chat(
    model="deepseek-coder:6.7b",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
        ]
    )   

    raw_content = response['message']['content']
    print("RAW CONTENT AI------------------------")
    print(raw_content)
    return raw_content

def excecuteAiGeneral(system_prompt, user_prompt):
    response = ollama.chat(
    model="deepseek-r1:7b",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
        ]
    )   

    raw_content = response['message']['content']
    print("RAW CONTENT AI------------------------")
    print(raw_content)
    return raw_content


# Example usage
chat("Can you show all products in the db?")

# executeQuery("SELECT * FROM orders")
