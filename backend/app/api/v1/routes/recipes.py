from fastapi import APIRouter, HTTPException
from app.models.recipe import Recipe, RecipeBase
from app.db import crud
from bson import ObjectId

router = APIRouter(prefix="/recipes", tags=["recipes"])

@router.post("/", response_model=Recipe)
async def create_recipe(recipe: RecipeBase):
    recipe_id = await crud.create_recipe(recipe)
    saved = await crud.get_recipe_by_id(recipe_id)
    if not saved:
        raise HTTPException(status_code=500, detail="Failed to retrieve created recipe")
    return saved

@router.get("/", response_model=list[Recipe])
async def list_recipes(limit: int = 10):
    recipes = await crud.get_all_recipes(limit)
    return recipes

@router.get("/{recipe_id}", response_model=Recipe)
async def get_recipe(recipe_id: str):
    if not ObjectId.is_valid(recipe_id):
        raise HTTPException(status_code=400, detail="Invalid recipe ID")
    recipe = await crud.get_recipe_by_id(recipe_id)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe