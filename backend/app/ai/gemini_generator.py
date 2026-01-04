import google.generativeai as genai
from app.config import GEMINI_API_KEY
from app.ai.prompt_builder import build_prompt
import json
import re

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")

def extract_json_from_text(text: str) -> str:
    """Extract JSON from text that might have markdown code blocks or extra text"""
    # Remove markdown code blocks if present
    text = text.strip()
    
    # Try to find JSON in markdown code blocks
    json_match = re.search(r'```(?:json)?\s*(\{.*?\})\s*```', text, re.DOTALL)
    if json_match:
        return json_match.group(1)
    
    # Try to find JSON object directly
    json_match = re.search(r'\{.*\}', text, re.DOTALL)
    if json_match:
        return json_match.group(0)
    
    # If no match, return original text
    return text

async def generate_recipe_with_gemini(ingredients: list[str]) -> dict:
    prompt = build_prompt(ingredients)

    try:
        response = model.generate_content(prompt)
        content = response.text
        
        # Extract JSON from response (handles markdown code blocks)
        json_text = extract_json_from_text(content)
        
        try:
            recipe = json.loads(json_text)
            
            # Validate required fields
            required_fields = ["title", "ingredients", "instructions"]
            missing_fields = [field for field in required_fields if field not in recipe]
            if missing_fields:
                return {
                    "error": f"Missing required fields: {missing_fields}",
                    "raw_output": content,
                    "parsed_json": recipe
                }
            
            # Ensure tags is a list (default to empty if missing)
            if "tags" not in recipe:
                recipe["tags"] = []
            
            return recipe
        except json.JSONDecodeError as e:
            return {
                "error": "Gemini did not return valid JSON",
                "raw_output": content,
                "extracted_json": json_text,
                "json_error": str(e)
            }

    except Exception as e:
        return {"error": str(e)}




#remove this comment later
# {
#     "available_models": [
#         "gemini-2.5-flash",
#         "gemini-2.5-pro",
#         "gemini-2.0-flash-exp",
#         "gemini-2.0-flash",
#         "gemini-2.0-flash-001",
#         "gemini-2.0-flash-exp-image-generation",
#         "gemini-2.0-flash-lite-001",
#         "gemini-2.0-flash-lite",
#         "gemini-2.0-flash-lite-preview-02-05",
#         "gemini-2.0-flash-lite-preview",
#         "gemini-exp-1206",
#         "gemini-2.5-flash-preview-tts",
#         "gemini-2.5-pro-preview-tts",
#         "gemma-3-1b-it",
#         "gemma-3-4b-it",
#         "gemma-3-12b-it",
#         "gemma-3-27b-it",
#         "gemma-3n-e4b-it",
#         "gemma-3n-e2b-it",
#         "gemini-flash-latest",
#         "gemini-flash-lite-latest",
#         "gemini-pro-latest",
#         "gemini-2.5-flash-lite",
#         "gemini-2.5-flash-image-preview",
#         "gemini-2.5-flash-image",
#         "gemini-2.5-flash-preview-09-2025",
#         "gemini-2.5-flash-lite-preview-09-2025",
#         "gemini-3-pro-preview",
#         "gemini-3-flash-preview",
#         "gemini-3-pro-image-preview",
#         "nano-banana-pro-preview",
#         "gemini-robotics-er-1.5-preview",
#         "gemini-2.5-computer-use-preview-10-2025",
#         "deep-research-pro-preview-12-2025"
#     ]
# }