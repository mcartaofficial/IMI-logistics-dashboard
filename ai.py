import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if api_key:
    genai.configure(api_key=api_key)

def generate_ai_insight(results, total_cost):

    if not api_key:
        return "Gemini API key not configured."

    model = genai.GenerativeModel("gemini-pro")

    prompt = f"""
You are a senior supply chain strategist.

Optimization Results:
{results}

Total Cost: ${total_cost}

Provide:
- Executive summary
- Cost risks
- Optimization opportunities
- Strategic recommendation
"""

    response = model.generate_content(prompt)

    return response.text
