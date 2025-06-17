from fastapi import APIRouter
from app.models.feedback import Feedback
from app.db.mongo import db

router = APIRouter(prefix="/feedback", tags=["feedback"])

@router.post("/", response_model=Feedback)
async def submit_feedback(feedback: Feedback):
    result = await db.feedback.insert_one(feedback.dict(by_alias=True))
    return await db.feedback.find_one({"_id": result.inserted_id})
