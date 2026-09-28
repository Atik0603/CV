from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("/", response_model=list[schemas.ProjectOut])
def get_projects(db: Session = Depends(get_db)):
    return db.query(models.Project).all()


@router.get("/{project_id}", response_model=schemas.ProjectOut)
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.post("/", response_model=schemas.ProjectOut)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db),
                    current_user: str = Depends(auth.get_current_user),):
    project_data = project.model_dump(exclude={"links"})
    db_project = models.Project(**project_data)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)

    for link in project.links:
        db_link = models.ProjectLink(**link.model_dump(), project_id=db_project.id)
        db.add(db_link)
    db.commit()
    db.refresh(db_project)

    return db_project


@router.put("/{project_id}", response_model=schemas.ProjectOut)
def update_project(project_id: int, project: schemas.ProjectCreate, db: Session = Depends(get_db),
                    current_user: str = Depends(auth.get_current_user),):
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")

    for key, value in project.model_dump(exclude={"links"}).items():
        setattr(db_project, key, value)

    db.query(models.ProjectLink).filter(models.ProjectLink.project_id == project_id).delete()
    for link in project.links:
        db_link = models.ProjectLink(**link.model_dump(), project_id=project_id)
        db.add(db_link)

    db.commit()
    db.refresh(db_project)
    return db_project


@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db),
                    current_user: str = Depends(auth.get_current_user),):
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(db_project)
    db.commit()
    return {"detail": "Project deleted"}