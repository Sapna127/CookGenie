from app.db.mongo import db
from app.models.recipe import RecipeBase
from typing import List
from bson import ObjectId

async def create_recipe(recipe: RecipeBase) -> str:
    result = await db.recipes.insert_one(recipe.dict())
    return str(result.inserted_id)

async def get_recipe_by_id(recipe_id: str):
    recipe = await db.recipes.find_one({"_id": ObjectId(recipe_id)})
    if recipe:
        recipe["_id"] = str(recipe["_id"])  # Convert ObjectId to string
    return recipe

async def get_all_recipes(limit: int = 10) -> List[dict]:
    cursor = db.recipes.find().sort("created_at", -1).limit(limit)
    recipes = await cursor.to_list(length=limit)  # ADD await here!
    # Convert ObjectIds to strings
    for recipe in recipes:
        if recipe and "_id" in recipe:
            recipe["_id"] = str(recipe["_id"])
    return recipes