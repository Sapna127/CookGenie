from fastapi import APIRouter, HTTPException
from app.models.user import User, UserBase
from app.db.mongo import db
from bson import ObjectId

def convert_objectid(doc):
    """Helper to convert ObjectIds to strings"""
    if not doc:
        return doc
    result = {}
    for key, value in doc.items():
        if isinstance(value, ObjectId):
            result[key] = str(value)
        elif isinstance(value, list) and value and isinstance(value[0], ObjectId):
            result[key] = [str(v) for v in value]
        elif hasattr(value, "isoformat") and key in ["created_at", "submitted_at"]:
            result[key] = value.isoformat()
        else:
            result[key] = value
    return result

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=User)
async def create_user(user: UserBase):
    existing = await db.users.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_dict = user.dict()
    # Convert saved_recipes strings to ObjectIds if provided and valid
    if user_dict.get("saved_recipes"):
        valid_recipe_ids = []
        for rid in user_dict["saved_recipes"]:
            if isinstance(rid, str) and ObjectId.is_valid(rid):
                valid_recipe_ids.append(ObjectId(rid))
            elif isinstance(rid, ObjectId):
                valid_recipe_ids.append(rid)
        user_dict["saved_recipes"] = valid_recipe_ids
    else:
        user_dict["saved_recipes"] = []
    
    result = await db.users.insert_one(user_dict)
    saved = await db.users.find_one({"_id": result.inserted_id})
    return convert_objectid(saved)

@router.get("/{user_id}", response_model=User)
async def get_user(user_id: str):
    if not ObjectId.is_valid(user_id):
        raise HTTPException(status_code=400, detail="Invalid user ID format")
    
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return convert_objectid(user)