from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.database import Base, engine
from app.routers import items


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(title="FastAPI Practice", lifespan=lifespan)
app.include_router(items.router)


@app.get("/")
def read_root():
    return {"message": "FastAPI + PostgreSQL practice app"}
