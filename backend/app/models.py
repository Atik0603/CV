from sqlalchemy import Column, Integer, String, ForeignKey, ARRAY, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    short_description = Column(String, nullable=False)
    long_description = Column(ARRAY(String), nullable=False)
    media_url = Column(String)
    media_type = Column(String)
    color = Column(String)
    created_at = Column(TIMESTAMP, server_default=func.now())

    links = relationship("ProjectLink", back_populates="project", cascade="all, delete-orphan")


class ProjectLink(Base):
    __tablename__ = "project_links"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    label = Column(String, nullable=False)
    url = Column(String, nullable=False)

    project = relationship("Project", back_populates="links")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)


class Profile(Base):
    __tablename__ = "profile"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    status_badge = Column(String, nullable=False)
    bio = Column(String, nullable=False)
    photo_url = Column(String)
    github_url = Column(String, nullable=False)
    linkedin_url = Column(String, nullable=False)



class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    category = Column(String)