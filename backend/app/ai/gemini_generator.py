import google.generativeai as genai
from app.config import GEMINI_API_KEY
from app.ai.prompt_builder import build_prompt
import json

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-pro")

async def generate_recipe_with_gemini(ingredients: list[str]) -> dict:
    prompt = build_prompt(ingredients)

    try:
        response = model.generate_content(prompt)
        content = response.text

        try:
            recipe = json.loads(content)
            return recipe
        except json.JSONDecodeError:
            return {
                "error": "Gemini did not return valid JSON",
                "raw_output": content
            }

    except Exception as e:
        return {"error": str(e)}
