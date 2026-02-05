from pydantic import BaseModel, EmailStr
from datetime import date, datetime

class EmployeeCreate(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str
    
class AttendanceCreate(BaseModel):
    employee_id: int
    date: date
    status: str

class AttendanceResponse(BaseModel):
    id: int
    employee_id: int
    date: datetime
    status: str