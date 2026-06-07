# FastAPI Practice

A minimal FastAPI app backed by PostgreSQL with SQLAlchemy.

## Setup

From this folder:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
docker compose up -d
```

## Run

```bash
uvicorn app.main:app --reload
```

## Try it

- http://localhost:8000/
- http://localhost:8000/docs
- `POST http://localhost:8000/items` with body `{"name": "Widget", "description": "A sample item"}`
- `GET http://localhost:8000/items`
