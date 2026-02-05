from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date
import pytz

from database import SessionLocal
from models import Attendance
from schemas import AttendanceCreate

router = APIRouter(prefix="/attendance", tags=["Attendance"])

IST = pytz.timezone("Asia/Kolkata")


# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def mark_attendance(
    data: AttendanceCreate,
    db: Session = Depends(get_db)
):
    existing = db.query(Attendance).filter(
        Attendance.employee_id == data.employee_id,
        Attendance.date == data.date
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Attendance already marked"
        )

    attendance = Attendance(
        employee_id=data.employee_id,
        date=data.date,
        status=data.status
    )

    db.add(attendance)
    db.commit()
    db.refresh(attendance)

    return {
        "message": "Attendance marked successfully",
        "attendance": attendance
    }

@router.get("/employee/{employee_id}")
def get_employee_attendance(
    employee_id: int,
    db: Session = Depends(get_db)
):
    return db.query(Attendance).filter(
        Attendance.employee_id == employee_id
    ).all()



@router.get("/{employee_id}")
def get_attendance(employee_id: int, db: Session = Depends(get_db)):
    return db.query(Attendance).filter(Attendance.employee_id == employee_id).all()
