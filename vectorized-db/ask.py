from fastapi import FastAPI
from pydantic import BaseModel
import chromadb
import ollama

app = FastAPI()

DATA_PATH = r"data"
CHROMA_PATH = r"chroma_db"
chroma_client = chromadb.PersistentClient(path=CHROMA_PATH)
collection = chroma_client.get_or_create_collection(name="imart")

class QueryRequest(BaseModel):
    question: str

class AnswerRequest(BaseModel):
    question: str
    data: str


@app.post("/generate-query/")
def generateQuery(request: QueryRequest):

    results = collection.query(
        query_texts = [request.question],
        n_results=1
    )

    if not results["documents"] or not results["documents"][0]:
        return {"response": "I don't know"}

    system_prompt = """
    You are a helpful assistant. You answer questions about IMART, which is an eCommerce website.  
    The following data contains the schema for the IMART database.  

🔹 You MUST ONLY answer the question using a valid **MySQL query**.  
🔹 DO NOT include explanations, comments, or any additional text.  
    Please surrounds the sql with a cointainer that is ***Formated*** By:
    ```sql[PUT QUERY HERE]```.
🔹 If you don't know the answer, respond with: **I don't know** (Nothing else). So its either mysql query or **I don't know**  
    --------------------
    The data:
    """+str(results['documents'])+"""
    """

    response = ollama.chat(
        model="deepseek-r1:1.5b",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": request.question}
        ]
    )


    print("\n\n---------------------\n\n")
    print(response["message"]["content"])
    return {"response": response["message"]["content"]}

@app.post("/generate-answer/")
def generateAnswer(request: AnswerRequest):
    system_prompt = f"""
    You are a helpful assistant. You answer questions about IMART, which is an eCommerce website.  
    A user has asked you a question. Please answer the quest as if your a customer service working in Imart
    ------------------------------------------
    The question:
    {request.question}
    ------------------------------------------
    Imart has provided you with some data relating to the question. Please Answer the question accrodinf to the data.
    --------------------
    The data:
     {request.data}
    """

    response = ollama.chat(
        model="deepseek-r1:1.5b",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": request.question}
        ]
    )

    print("\n\n---------------------\n\n")
    print(response["message"]["content"])

    return {"response": response["message"]["content"]}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port = 8000)


