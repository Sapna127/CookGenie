from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.routes import recipes, users, feedback, ai

app = FastAPI(title="CookGenie API", version="1.0")

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite default port
        "http://localhost:3000",  # Alternative port
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(recipes.router)
app.include_router(users.router)
app.include_router(feedback.router)
app.include_router(ai.router, prefix="/api/v1", tags=["ai"])

@app.get("/")
async def root():
    return {"message": "CookGenie backend is alive!"}