from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, SessionLocal, get_db
from .funciones import get_all_canchas, get_cancha_by_id, get_all_reservas, get_reserva_by_id, create_reserva, create_cancha, delete_reserva, delete_cancha, modify_cancha, modify_reserva, get_reservas_pag, get_canchas_pag
from .models import Base
from .schemas import CanchaId, ReservaId, ReservaCreate, CanchaCreate, ReservaResponse, CanchaResponse
from sqlalchemy.orm import Session
from typing import List, Dict, Any

app = FastAPI()
Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers =  ["*"]
)

@app.get("/reservas", response_model=ReservaResponse)
def get_reservas_paginadas(
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    skip = (page - 1) * size
    reservas = get_reservas_pag(db=db, skip=skip, size=size)
    return reservas

@app.get("/canchas", response_model=CanchaResponse)
def get_canchas_paginadas(
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    skip = (page - 1) * size
    canchas = get_canchas_pag(db=db, skip=skip, size=size)
    return canchas

@app.get("/canchas", response_model=List[CanchaId])
def get_canchas(db: Session = Depends(get_db)):
    return get_all_canchas(db=db)

@app.get("/canchas/{_id}", response_model=CanchaId)
def get_cancha(_id: int, dbs: Session = Depends(get_db)):
    return get_cancha_by_id(db=dbs, id=_id)

# @app.get("/reservas", response_model=List[ReservaId])
# def get_reservas(db: Session = Depends(get_db)):
#     return get_all_reservas(db=db)

# @app.get("/reservas", response_model=List[ReservaId])
# def get_reservas_limit(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
#     return get_limit_reservas(skip, limit, db)

@app.get("/reservas/{id}", response_model=ReservaId)
def get_reserva(id:int, db: Session = Depends(get_db)):
    return get_reserva_by_id(db=db, id=id)

@app.post("/canchas")
def crear_cancha(cancha: CanchaCreate, db: Session = Depends(get_db)):
    try:
        nueva_cancha = create_cancha(db=db, cancha=cancha)
        return nueva_cancha
    except HTTPException as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@app.post("/reservas/")
def crear_reserva(reserva: ReservaCreate, db: Session = Depends(get_db)):
    try:
        nueva_reserva = create_reserva(db=db, reserva=reserva)
        return nueva_reserva
    except HTTPException as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@app.delete("/canchas/{id}")
def eliminar_cancha(id: int, db:Session = Depends(get_db)):
    try:
        cancha_eliminar = delete_cancha(db=db, id=id)
        return cancha_eliminar
    except HTTPException as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/reservas/{id}")
def eliminar_reserva(id: int, db: Session = Depends(get_db)):
    try:
        reserva_eliminar = delete_reserva(db=db, id=id)
        return reserva_eliminar
    except HTTPException as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.put("/canchas/{id}")
def modificar_cancha(id: int, cancha: CanchaCreate, db: Session = Depends(get_db)):
    try:
        cancha_actualizada = modify_cancha(db=db, id=id, cancha=cancha)
        return cancha_actualizada
    except HTTPException as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@app.put("/reservas/{id}")
def modificar_reserva(id: int, reserva: ReservaCreate, db: Session = Depends(get_db)):
    try:
        reserva_actualizada = modify_reserva(db=db, id=id, reserva=reserva)
        return reserva_actualizada
    except HTTPException as e:
        raise HTTPException(status_code=400, detail=str(e))


