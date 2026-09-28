from pydantic import BaseModel
from typing import Optional

class ProjectLinkBase(BaseModel):
    label: str
    url: str

class ProjectLinkCreate(ProjectLinkBase):
    pass

class ProjectLinkOut(ProjectLinkBase):
    id: int

    class Config:
        from_attributes = True


class ProjectBase(BaseModel):
    name: str
    short_description: str
    long_description: list[str]
    media_url: Optional[str] = None
    media_type: Optional[str] = None
    color: Optional[str] = None

class ProjectCreate(ProjectBase):
    links: list[ProjectLinkCreate] = []

class ProjectOut(ProjectBase):
    id: int
    links: list[ProjectLinkOut] = []

    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class ProfileBase(BaseModel):
    name: str
    role: str
    status_badge: str
    bio: str
    photo_url: Optional[str] = None
    github_url: str
    linkedin_url: str

class ProfileOut(ProfileBase):
    id: int

    class Config:
        from_attributes = True


class SkillBase(BaseModel):
    name: str
    category: Optional[str] = None

class SkillCreate(SkillBase):
    pass

class SkillOut(SkillBase):
    id: int

    class Config:
        from_attributes = True