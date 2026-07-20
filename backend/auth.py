from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr

from sqlalchemy.orm import Session

from database import get_db
from models.user import User

from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

router = APIRouter()


class RegisterUser(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginUser(BaseModel):
    email: EmailStr
    password: str


@router.post("/register")
def register(user: RegisterUser, db: Session = Depends(get_db)):

    existing = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already registered."
        )
    if len(user.password.encode("utf-8")) > 72:
        raise HTTPException(
        status_code=400,
        detail="Password must be 72 bytes or fewer."
    )
    hashed_password = pwd_context.hash(
        user.password
    )

    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)

    db.commit()

    return {
        "message": "Registration Successful"
    }


@router.post("/login")
def login(user: LoginUser, db: Session = Depends(get_db)):

    existing = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing:
        raise HTTPException(
            status_code=400,
            detail="Invalid Email"
        )

    if not pwd_context.verify(
        user.password,
        existing.password
    ):
        raise HTTPException(
            status_code=400,
            detail="Invalid Password"
        )

    return {
        "message": "Login Successful",
        "name": existing.name,
        "email": existing.email
    }