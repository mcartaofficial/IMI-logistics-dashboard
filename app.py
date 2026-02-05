from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from data_loader import load_data
from optimizer import optimize_shipping
from ai import generate_ai_insight

app = FastAPI()

# Allow React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "Supply Chain AI Backend Running"}

@app.get("/dashboard")
def dashboard():

    coa, fob, schedule = load_data()

    results, total_cost = optimize_shipping(coa, schedule)

    insight = generate_ai_insight(results, total_cost)

    return {
        "optimization": results,
        "total_cost": total_cost,
        "ai_insight": insight
    }
