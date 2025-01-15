from operator import and_
from sqlalchemy.orm import Session
from .models import Cancha, Reserva
from .schemas import ReservaCreate
from fastapi import HTTPException

def get_all_canchas(db: Session):
    return db.query(Cancha).all()

def get_cancha_by_id(db: Session, id: int):
    return db.query(Cancha).filter(Cancha.id == id).first()

def get_all_reservas(db: Session):
    return db.query(Reserva).all()

# def get_limit_reservas(skip: int, limit: int, db: Session):
#     reservas = db.query(Reserva).offset(skip).limit(limit).all()
#     return reservas

def get_reservas_pag(db: Session, skip: int, size: int):
    reservas_pag = db.query(Reserva).offset(skip).limit(size).all()
    total_reservas = db.query(Reserva).count()
    return {
        "reservas" : reservas_pag, 
        "total" : total_reservas
        }

def get_canchas_pag(db: Session, skip: int, size: int):
    canchas_pag = db.query(Cancha).offset(skip).limit(size).all()
    total_canchas = db.query(Cancha).count()
    return {
        "canchas" : canchas_pag, 
        "total" : total_canchas
        }

def get_reserva_by_id(db: Session, id: int):
    return db.query(Reserva).filter(Reserva.id == id).first()

def create_cancha(db: Session, cancha: Cancha):
    cancha_existente = db.query(Cancha).filter(
        Cancha.nombre == cancha.nombre
    ).first()

    if cancha_existente:
        raise HTTPException(status_code=400, detail="La cancha ya existe, utilice otro nombre.")

    nueva_cancha = Cancha(
        nombre = cancha.nombre,
        tienetecho = cancha.tienetecho
    )

    db.add(nueva_cancha)
    db.commit()
    db.refresh(nueva_cancha)
    return nueva_cancha

def create_reserva(db: Session, reserva: ReservaCreate):
    horario_ocupado = db.query(Reserva).filter(
        Reserva.dia == reserva.dia,
        Reserva.hora < reserva.hora + reserva.duracion,  
        Reserva.hora + Reserva.duracion > reserva.hora,  
        Reserva.cancha_id == reserva.cancha_id
    ).first()
    
    #ver si la cancha EXISTE primero
    if horario_ocupado:
        raise HTTPException(status_code=400, detail="La cancha ya está ocupada en ese horario.")
    
    nueva_reserva = Reserva(
        dia = reserva.dia,
        hora = reserva.hora,
        duracion = reserva.duracion,
        nombrecontacto = reserva.nombrecontacto,
        telefonocontacto = reserva.telefonocontacto,
        cancha_id = reserva.cancha_id
    )

    db.add(nueva_reserva)
    db.commit()
    db.refresh(nueva_reserva)
    return nueva_reserva

def delete_reserva(db: Session, id: int):
    existe = db.query(Reserva).filter(
        Reserva.id == id
    ).first()

    if not existe:
        raise HTTPException(status_code=400, detail= f"No existe la reserva con id {id}")
    
    db.delete(existe)
    db.commit()
    return {"mensaje": f"Reserva con id {existe.id} eliminada con éxito"}

def delete_cancha(db: Session, id: int):
    existe = db.query(Cancha).filter(
        Cancha.id == id
    ).first()

    if not existe:
        raise HTTPException(status_code=400, detail= f"No existe la cancha con id {id}")
    
    db.delete(existe)
    db.commit()
    return {"mensaje": f"Cancha con id {existe.id} eliminada con éxito"}

def modify_cancha(db: Session, id: int, cancha: Cancha):
    existe = db.query(Cancha).filter(
        Cancha.id == id
    ).first()

    if not existe:
        raise HTTPException(status_code=400, detail= f"No existe la cancha con id {id}")
    
    if existe.nombre == cancha.nombre and existe.tienetecho == cancha.tienetecho:
        raise HTTPException(status_code=400, detail= f"Por favor, ingrese alguna modificación")

    existe.nombre = cancha.nombre
    existe.tienetecho = cancha.tienetecho
    db.commit()
    db.refresh(existe)
    return {"message" : "cancha actualizada exitosamente"}

def modify_reserva(db: Session, id: int, reserva: ReservaCreate):
    existe = db.query(Reserva).filter(
        Reserva.id == id
    ).first()

    canchaExiste = db.query(Cancha).filter(
        Cancha.id == reserva.cancha_id
    ).first()

    if not existe:
        raise HTTPException(status_code=400, detail= f"No existe ninguna reserva con id {id}")
    if not canchaExiste:
        raise HTTPException(status_code=400, detail= f"No existe ninguna cancha con id {reserva.cancha_id}")
    
    horario_ocupado = db.query(Reserva).filter(
        Reserva.dia == reserva.dia,
        Reserva.hora < reserva.hora + reserva.duracion,  
        Reserva.hora + Reserva.duracion > reserva.hora,  
        Reserva.cancha_id == reserva.cancha_id
    ).first()
    
    if horario_ocupado:
        raise HTTPException(status_code=400, detail="La cancha ya está ocupada en ese horario.")

    existe.dia = reserva.dia,
    existe.hora = reserva.hora,
    existe.duracion = reserva.duracion,
    existe.nombrecontacto = reserva.nombrecontacto,
    existe.telefonocontacto = reserva.telefonocontacto,
    existe.cancha_id = reserva.cancha_id

    db.commit()
    db.refresh(existe)
    return {"message" : "Reserva actualizada exitosamente"}



