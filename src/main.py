from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, world!"}

@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}

@app.post("/items")
def create_item(item: dict):
    return {"received": item}

@app.get("/api/usage")
def get_usage():
    return {
        "success": 6,
        "failed": 7,
        "window": "1h",
    }