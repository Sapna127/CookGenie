from fastapi import APIRouter, HTTPException
from app.ai.gemini_generator import generate_recipe_with_gemini
from app.models.recipe import RecipeBase
from app.db import crud
from pydantic import BaseModel
from typing import List

class IngredientsRequest(BaseModel):
    ingredients: List[str]

router = APIRouter()

@router.post("/generate-gemini", response_model=RecipeBase)
async def generate_with_gemini(request: IngredientsRequest):
    if not request.ingredients:
        raise HTTPException(status_code=400, detail="Ingredient list is required")

    result = await generate_recipe_with_gemini(request.ingredients)

    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])

    # Save recipe to database
    recipe_data = RecipeBase(**result)
    recipe_id = await crud.create_recipe(recipe_data)
    
    return result