import requests
import ollama

# url = "http://172.28.134.19:11434/v1/chat/completions"
# headers = {"Content-Type": "application/json"}
# data = {
#     "model": "deepseek-r1",
#     "messages": [
#         {"role": "system", "content": "be helpful"},
#         {"role": "user", "content": "hello who are you?"}
#     ],
#     "temperature": 0.7
# }

# response = requests.post(url, json=data, headers=headers)
# print(response.json()) 

system_prompt = """
You are a query classifier that categorizes questions into three types. Users are expected to ask questions about various tables in our database. The database belongs to IMART, an eccomerce website where user can buy products. However, they may also ask general questions that relate to data analysis or IMART in general. We want to classify questions unrelated to data analysis as "OUT_OF_SCOPE".Respond in JSON format matching this schema:
JSON{"queryType": "GENERAL_QUESTION" | "DATA_QUESTION" | "OUT_OF_SCOPE"}JSON`,
"""

user_prompt = """
Question:
Display All Product whos Id is more than 5
"""

response = ollama.chat(
    model="deepseek-coder:6.7b",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]
)

print(response['message']['content'])  # Print the AI-generated SQL query
