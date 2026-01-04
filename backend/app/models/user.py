from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: EmailStr
    pantry: List[str] = []
    saved_recipes: List[str] = []

class User(UserBase):
    id: Optional[str] = Field(None, alias="_id")
    created_at: Optional[datetime] = None

    model_config = ConfigDict(
        populate_by_name=True
    )