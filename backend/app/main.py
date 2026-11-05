from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from . import models
from .routes import projects, auth as auth_routes, profile as profile_routes, skills as skills_routes, cv as cv_routes
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from .rate_limit import limiter
import os

Base.metadata.create_all(bind=engine)

IS_PROD = os.getenv("ENV") == "production"

app = FastAPI(
    docs_url=None if IS_PROD else "/docs",
    redoc_url=None if IS_PROD else "/redoc",
    openapi_url=None if IS_PROD else "/openapi.json",
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:5173")],
    allow_methods=["*"],
    allow_headers=["*"],
)

    
app.include_router(projects.router)
app.include_router(auth_routes.router)
app.include_router(profile_routes.router)
app.include_router(skills_routes.router)
app.include_router(cv_routes.router)

@app.get("/")
def read_root():
    return {"status": "backend is running"}