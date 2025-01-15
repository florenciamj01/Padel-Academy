from fastapi import HTTPException
from pydantic import BaseModel, Field, ValidationError, field_validator
from datetime import date
from sqlalchemy import and_, or_
from .database import get_db
from sqlalchemy.orm import Session
from typing import List

class CanchaCreate(BaseModel):
    nombre: str
    tienetecho: bool

    class Config:
        from_attributes = True

class CanchaId(CanchaCreate):
    id: int

    class Config:
        from_attributes = True

class CanchaResponse(BaseModel):
    canchas: List[CanchaId]
    total: int

class ReservaCreate(BaseModel):
    dia: date = Field(..., example="2024-12-22")
    hora: int = Field(..., example=18)
    duracion: int = Field(..., example=1, ge=1, description="Duración de la reserva en horas")
    nombrecontacto: str = Field(..., example="Juan Pérez", max_length=100)
    telefonocontacto: int = Field(..., example=123456789)
    cancha_id: int = Field(..., example=1, ge=1)

    class Config:
        from_attributes = True


class ReservaId(ReservaCreate):
    id: int

    class Config:
        from_attributes = True

class ReservaResponse(BaseModel):
    reservas: List[ReservaId]
    total: int
    

# class RespuestaPaginada(ReservaId):
#     total: int
#     page: int
#     size: int

#     class Config:
#         from_attributes = True




