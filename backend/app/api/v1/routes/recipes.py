from fastapi import APIRouter, HTTPException
from app.models.recipe import Recipe, RecipeBase
from app.db import crud

router = APIRouter(prefix="/recipes", tags=["recipes"])

@router.post("/", response_model=Recipe)
async def create_recipe(recipe: RecipeBase):
    recipe_id = await crud.create_recipe(recipe)
    saved = await crud.get_recipe_by_id(recipe_id)
    return saved

@router.get("/", response_model=list[Recipe])
async def list_recipes(limit: int = 10):
    return await crud.get_all_recipes(limit)
