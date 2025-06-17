from fastapi import APIRouter
from app.models.request_log import RequestLog
from app.db.mongo import db

router = APIRouter(prefix="/request-logs", tags=["request_logs"])

@router.post("/", response_model=RequestLog)
async def log_request(log: RequestLog):
    result = await db.request_logs.insert_one(log.dict(by_alias=True))
    return await db.request_logs.find_one({"_id": result.inserted_id})
