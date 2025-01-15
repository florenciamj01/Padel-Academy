from sqlalchemy import Column, Date, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Cancha(Base):
    __tablename__ = 'canchas'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String, nullable=False)
    tienetecho = Column(Boolean)

    reserva = relationship("Reserva", back_populates="cancha", cascade="all, delete-orphan")

class Reserva(Base):
    __tablename__ = 'reservas'
    id = Column(Integer, primary_key=True, autoincrement=True)
    dia = Column(Date, nullable=False)
    hora = Column(Integer, nullable=False)
    duracion = Column(Integer, nullable=False)
    nombrecontacto = Column(String, nullable=False)
    telefonocontacto = Column(Integer, nullable=False)
    cancha_id = Column(Integer, ForeignKey("canchas.id", ondelete="CASCADE"), nullable=False)

    cancha = relationship("Cancha", back_populates="reserva")


#El relationship es como "cruzado" entre las dos tablas que se relacionan. El back_populates de uno apunta al otro y viceversa. De esa forma yo después voy a poder acceder a, por ejemplo, Cancha.reserva o Reserva.cancha

