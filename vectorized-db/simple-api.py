from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return{"message" : "Hello World"}

@app.get("/test")
def test():
    return {"message" : "test page"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port = 8000)