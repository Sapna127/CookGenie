from fastapi import FastAPI
from app.api.v1.routes import recipes, users, feedback

app = FastAPI(title="CookGenie API", version="1.0")

app.include_router(recipes.router)
app.include_router(users.router)
app.include_router(feedback.router)

@app.get("/")
async def root():
    return {"message": "CookGenie backend is alive!"}
