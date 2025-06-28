from fastapi import APIRouter, HTTPException
from app.ai.gemini_generator import generate_recipe_with_gemini
from backend.app.models.recipe import RecipeBase
from backend.app.db import db  

router = APIRouter()

@router.post("/generate-gemini", response_model=RecipeBase)
async def generate_with_gemini(ingredients: list[str]):
    if not ingredients:
        raise HTTPException(status_code=400, detail="Ingredient list is required")

    result = await generate_recipe_with_gemini(ingredients)

    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])

    # Optionally save it to DB
    await db.recipes.insert_one(result)

    return result
