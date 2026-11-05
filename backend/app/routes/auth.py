import os
import secrets
import hashlib
from datetime import datetime, timedelta
from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Request
from ..rate_limit import limiter
from sqlalchemy.orm import Session
from .. import models, schemas, auth
from ..database import get_db
from ..email_utils import send_email

router = APIRouter(prefix="/auth", tags=["auth"])

RESET_TOKEN_MINUTES = 30


def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()

@router.post("/forgot-password")
@limiter.limit("3/15minutes")
def forgot_password(
    request: Request,
    data: schemas.ForgotPasswordRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    user = db.query(models.User).filter(models.User.email == data.email).first()

    if user:
        token = secrets.token_urlsafe(32)
        user.reset_token_hash = hash_token(token)
        user.reset_token_expires = datetime.utcnow() + timedelta(minutes=RESET_TOKEN_MINUTES)
        db.commit()

        link = f"{os.environ['FRONTEND_URL']}/admin/reset-password?token={token}"
        body = (
            "Someone requested a password reset for your CV website admin account.\n\n"
            f"Reset your password here (valid for {RESET_TOKEN_MINUTES} minutes):\n{link}\n\n"
            "If this wasn't you, ignore this email. Your password stays the same."
        )
        background_tasks.add_task(send_email, user.email, "Reset your password", body)

    return {"message": "If that email is registered, a reset link has been sent."}


@router.post("/reset-password")
@limiter.limit("10/hour")
def reset_password(request: Request, data: schemas.ResetPasswordRequest, db: Session = Depends(get_db)):
    user = (
        db.query(models.User)
        .filter(models.User.reset_token_hash == hash_token(data.token))
        .first()
    )

    if (
        not user
        or not user.reset_token_expires
        or user.reset_token_expires < datetime.utcnow()
    ):
        raise HTTPException(status_code=400, detail="Invalid or expired reset link")

    user.hashed_password = auth.hash_password(data.new_password)
    user.reset_token_hash = None
    user.reset_token_expires = None
    db.commit()

    return {"message": "Password updated"}


@router.post("/signup", response_model=schemas.Token)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user_count = db.query(models.User).count()
    if existing_user_count > 0:
        raise HTTPException(status_code=403, detail="Signup is disabled")
    
    existing = db.query(models.User).filter(models.User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed = auth.hash_password(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    token = auth.create_access_token({"sub": db_user.email})
    return {"access_token": token, "token_type": "bearer"}


@router.post("/login", response_model=schemas.Token)
@limiter.limit("5/minute")
def login( request: Request, user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not auth.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = auth.create_access_token({"sub": db_user.email})
    return {"access_token": token, "token_type": "bearer"}