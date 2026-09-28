from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from . import models
from .routes import projects, auth as auth_routes, profile as profile_routes, skills as skills_routes


Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

    
app.include_router(projects.router)
app.include_router(auth_routes.router)
app.include_router(profile_routes.router)
app.include_router(skills_routes.router)

@app.get("/")
def read_root():
    return {"status": "backend is running"}