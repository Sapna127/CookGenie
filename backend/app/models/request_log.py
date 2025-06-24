from typing import List, Optional, Any
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

class RequestLog(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    input_ingredients: List[str]
    generated_recipe_id: Optional[PyObjectId]
    response_time_ms: int
    source: Optional[str] = "web"
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {ObjectId: str}
        validate_by_name = True
