from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_json_schema__(cls, schema, handler):
        return {"type": "string"}

    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

# Base model (used for creation)
class RecipeBase(BaseModel):
    title: str
    ingredients: List[str]
    substitutions: Optional[Dict[str, List[str]]] = None
    instructions: str
    tags: Optional[List[str]] = []
    pantry_mode: Optional[bool] = False

# Model for response (includes ID and timestamp)
class Recipe(RecipeBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    created_by: Optional[str] = "openai"
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {ObjectId: str}
        validate_by_name = True
        json_schema_extra = {
            "example": {
                "title": "Spicy Tomato Pasta",
                "ingredients": ["pasta", "tomato", "garlic"],
                "substitutions": {
                    "pasta": ["zucchini noodles"]
                },
                "instructions": "1. Boil pasta. 2. Sauté tomato and garlic...",
                "tags": ["vegetarian", "quick"],
                "pantry_mode": True,
                "created_by": "openai"
            }
        }
