from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "Production Kubernetes Backend",
        "environment": os.getenv("APP_ENV", "development")
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy"
    }


@app.get("/api/products")
def products():
    return {
        "products": [
            {
                "id": 1,
                "name": "Laptop",
                "price": 75000
            },
            {
                "id": 2,
                "name": "Keyboard",
                "price": 2500
            },
            {
                "id": 3,
                "name": "Mouse",
                "price": 1200
            }
        ]
    }
