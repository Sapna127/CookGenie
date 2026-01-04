from fastapi import APIRouter, HTTPException
from app.models.feedback import Feedback, FeedbackBase
from app.db.mongo import db
from bson import ObjectId
from typing import Optional

router = APIRouter(prefix="/feedback", tags=["feedback"])

@router.post("/", response_model=Feedback)
async def submit_feedback(feedback: FeedbackBase):
    # Validate recipe_id
    if not ObjectId.is_valid(feedback.recipe_id):
        raise HTTPException(status_code=400, detail="Invalid recipe_id format")
    
    # Prepare feedback dict
    feedback_dict = {
        "recipe_id": ObjectId(feedback.recipe_id),
        "liked": feedback.liked,
        "comment": feedback.comment,
    }
    
    # Add user_id if provided
    if feedback.user_id:
        if not ObjectId.is_valid(feedback.user_id):
            raise HTTPException(status_code=400, detail="Invalid user_id format")
        feedback_dict["user_id"] = ObjectId(feedback.user_id)
    
    result = await db.feedback.insert_one(feedback_dict)
    saved = await db.feedback.find_one({"_id": result.inserted_id})
    
    # Convert ObjectIds to strings for JSON serialization
    if saved:
        saved["_id"] = str(saved["_id"])
        if saved.get("recipe_id"):
            saved["recipe_id"] = str(saved["recipe_id"])
        if saved.get("user_id"):
            saved["user_id"] = str(saved["user_id"])
        if saved.get("submitted_at"):
            saved["submitted_at"] = saved["submitted_at"].isoformat() if hasattr(saved["submitted_at"], "isoformat") else str(saved["submitted_at"])
    
    return saved