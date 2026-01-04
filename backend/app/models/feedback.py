from typing import Optional
from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime

class FeedbackBase(BaseModel):
    recipe_id: str
    user_id: Optional[str] = None
    liked: bool
    comment: Optional[str] = None

class Feedback(FeedbackBase):
    id: Optional[str] = Field(None, alias="_id")
    recipe_id: str
    user_id: Optional[str] = None
    submitted_at: Optional[datetime] = None

    model_config = ConfigDict(
        populate_by_name=True
    )