from typing import List, Optional, Dict
from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime

class RecipeBase(BaseModel):
    title: str
    ingredients: List[str]
    substitutions: Optional[Dict[str, List[str]]] = None
    instructions: str
    tags: Optional[List[str]] = []
    pantry_mode: Optional[bool] = False

class Recipe(RecipeBase):
    id: Optional[str] = Field(None, alias="_id")
    created_by: Optional[str] = "openai"
    created_at: Optional[datetime] = None

    model_config = ConfigDict(
        populate_by_name=True
    )