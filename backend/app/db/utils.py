from bson import ObjectId
from typing import Any, Dict

def convert_objectid_to_str(doc: Dict[str, Any]) -> Dict[str, Any]:
    """Convert MongoDB ObjectIds to strings for JSON serialization"""
    if not doc:
        return doc
    
    converted = {}
    for key, value in doc.items():
        if isinstance(value, ObjectId):
            converted[key] = str(value)
        elif isinstance(value, list):
            converted[key] = [str(item) if isinstance(item, ObjectId) else item for item in value]
        elif isinstance(value, dict):
            converted[key] = convert_objectid_to_str(value)
        elif hasattr(value, "isoformat") and key in ["created_at", "submitted_at", "updated_at"]:
            # Convert datetime to ISO string
            converted[key] = value.isoformat()
        else:
            converted[key] = value
    
    return converted