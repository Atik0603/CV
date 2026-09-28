from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/profile", tags=["profile"])


@router.get("/", response_model=schemas.ProfileOut)
def get_profile(db: Session = Depends(get_db)):
    profile = db.query(models.Profile).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not set up yet")
    return profile


@router.put("/", response_model=schemas.ProfileOut)
def update_profile(
    profile: schemas.ProfileBase,
    db: Session = Depends(get_db),
    current_user: str = Depends(auth.get_current_user),
):
    db_profile = db.query(models.Profile).first()

    if not db_profile:
        db_profile = models.Profile(**profile.model_dump())
        db.add(db_profile)
    else:
        for key, value in profile.model_dump().items():
            setattr(db_profile, key, value)

    db.commit()
    db.refresh(db_profile)
    return db_profile