from fastapi import APIRouter, HTTPException
from app.models.user import User, UserBase
from app.db.mongo import db
from bson import ObjectId

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=User)
async def create_user(user: UserBase):
    if await db.users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    result = await db.users.insert_one(user.dict())
    return await db.users.find_one({"_id": result.inserted_id})

@router.get("/{user_id}", response_model=User)
async def get_user(user_id: str):
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
