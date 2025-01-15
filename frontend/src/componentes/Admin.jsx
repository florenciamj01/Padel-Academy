import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dialogo from "./Dialogo"
import useFetchReservas from "../useFetchReservas";
import useFetchCanchas from "../useFetchCanchas";
import { Box, Button, Typography, Paper } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import {IconButton} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "@fontsource/montserrat";

const Admin = () => {
    const [selectedCancha, setSelectedCancha] = useState(null);
    const [selectedReserva, setSelectedReserva] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const {
        reservas,
        paginaActualRes,
        totalPaginasRes,
        siguientePaginaRes,
        anteriorPaginaRes,
        refetchReservas
    } = useFetchReservas("http://localhost:8000/reservas", 10);
    const {
        canchas,
        paginaActual,
        totalPaginas,
        siguientePagina,
        anteriorPagina,
        refetchCanchas
    } = useFetchCanchas("http://localhost:8000/canchas", 10)

    const navigate = useNavigate();

    const abrirDialogoModificar = () => {
        setFormData(formData);
        if(selectedCancha || selectedReserva){
            setIsDialogOpen(true);
        }
    }

    const guardarCambios = (nuevaData) => {
        if(nuevaData){
            setFormData(nuevaData);
        }
    }

    const cerrarDialogo = () => {
        setIsDialogOpen(false);
    }

    const seleccionarCancha = (cancha) => {
        if(selectedReserva){
            setSelectedReserva(null);
        }
        setSelectedCancha(cancha);
        setFormData(cancha);
    };

    const seleccionarReserva = (reserva) => {
        if(selectedCancha){
            setSelectedCancha(null);
        }
        setSelectedReserva(reserva);
        setFormData(reserva);
    };

    const eliminarCancha = () => {
        if(!selectedCancha){
            alert("Por favor, selecciona una cancha para eliminar.");
            return;
        }

        const confirmacion = window.confirm(
            `¿Estás seguro de que deseas eliminar la cancha "${selectedCancha.nombre}"?`
        );
        if (!confirmacion) return;

        axios
        .delete(`http://localhost:8000/canchas/${selectedCancha.id}`)
        .then(() => {
        alert("Cancha eliminada con éxito.");
        refetchCanchas();
        
        })
        .catch((error) => console.error("Error al eliminar la cancha:", error));
        setSelectedCancha(null);
    }

    const eliminarReserva = () => {
        if(!selectedReserva){
            alert("Por favor, selecciona una reserva para eliminar.");
            return;
        }

        const confirmacion = window.confirm(
            `¿Estás seguro de que deseas eliminar la reserva con ID "${selectedReserva.id}"?`
        );
        if (!confirmacion) return;

        axios
        .delete(`http://localhost:8000/reservas/${selectedReserva.id}`)
        .then(() => {
        alert("Reserva eliminada con éxito.");
        refetchReservas();
        
        })
        .catch((error) => console.error("Error al eliminar la reserva:", error));
        setSelectedReserva(null);
    }

    return (
        <>
            <Box sx={{display: 'flex', backgroundColor: 'Highlight'}}>
            <Tooltip title='Volver'>
                <IconButton onClick={() => navigate('/')} sx={{color: 'white'}}>
                    <ArrowBackIcon />
                </IconButton>
            </Tooltip>
            <Typography variant="h5" sx={{width: '100%', textAlign: 'center', marginLeft: -4, fontFamily: "Montserrat, sans-serif", color: 'white', padding: 1}}>Administrar Canchas y Reservas</Typography>
            </Box>
            <Grid container sx={{display: 'flex'}}>
                <Grid item md={6}>
                    <Typography sx={{width: 550, textAlign: 'center', backgroundColor: 'GrayText', fontFamily: "Montserrat, sans-serif", color: 'white'}}>
                        Canchas
                    </Typography>
                    <TableContainer component={Paper} sx={{ width: 550, height: 400, overflowY: 'scroll' }}>
                        <Table sx={{ minWidth: 550 }} stickyHeader>
                            <TableHead>
                            <TableRow sx={{backgroundColor: 'lightgrey'}}>
                                <TableCell sx={{width: 100, fontFamily: "Montserrat, sans-serif"}}>ID</TableCell>
                                <TableCell sx={{width: 200, fontFamily: "Montserrat, sans-serif"}}>NOMBRE</TableCell>
                                <TableCell sx={{width: 100, fontFamily: "Montserrat, sans-serif"}}>TIENE TECHO</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {canchas.map((cancha) => (
                                <TableRow
                                key={cancha.id}
                                onClick={() => seleccionarCancha(cancha)}
                                style={{
                                    backgroundColor:
                                    selectedCancha?.id === cancha.id
                                        ? "#d3d3d3"
                                        : "transparent",
                                    cursor: "pointer",
                                }}
                                >
                                <TableCell>{cancha.id}</TableCell>
                                <TableCell>{cancha.nombre}</TableCell>
                                <TableCell>{cancha.tienetecho ? "Si" : "No"}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{display: 'flex', width: 550, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', fontFamily: "Montserrat, sans-serif"}}>
                        <Button sx={{margin: 1}} onClick={() => abrirDialogoModificar()}>
                            Modificar Cancha
                        </Button>
                        <Button sx={{margin: 1, color: 'red', fontFamily: "Montserrat, sans-serif"}} onClick={() => eliminarCancha()}>
                            Eliminar Cancha
                        </Button>
                    </Box>
                    <Box sx={{display: 'flex', width: 550, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
                        <Button sx={{margin: 2, fontFamily: "Montserrat, sans-serif"}} variant="contained" color="primary" onClick={anteriorPagina} disabled={paginaActual === 1}>
                            Anterior página
                        </Button>
                        <Typography sx={{fontFamily: "Montserrat, sans-serif"}}>Página {paginaActual} de {totalPaginas}</Typography>
                        <Button sx={{margin: 2, fontFamily: "Montserrat, sans-serif"}} variant="contained" color="primary" onClick={siguientePagina} disabled={paginaActual === totalPaginas}>
                            Siguiente página
                        </Button>
                    </Box>
                </Grid>
                
                <Grid item md={6} sx={{justifyItems: 'right'}}>
                    <Typography sx={{width: 650, textAlign: 'center', backgroundColor: 'GrayText', fontFamily: "Montserrat, sans-serif", color: 'white'}}>
                            Reservas
                    </Typography>
                    <TableContainer component={Paper} sx={{ width: 650, height: 400, overflowY: 'scroll' }}>
                        <Table sx={{width: 650}} stickyHeader>
                            <TableHead>
                            <TableRow sx={{backgroundColor: 'lightgrey'}}>
                                <TableCell sx={{fontFamily: "Montserrat, sans-serif"}}>ID</TableCell>
                                <TableCell sx={{fontFamily: "Montserrat, sans-serif"}}>FECHA</TableCell>
                                <TableCell sx={{fontFamily: "Montserrat, sans-serif"}}>HORA</TableCell>
                                <TableCell sx={{fontFamily: "Montserrat, sans-serif"}}>NOMBRE</TableCell>
                                <TableCell sx={{fontFamily: "Montserrat, sans-serif"}}>DURACIÓN</TableCell>
                                <TableCell sx={{fontFamily: "Montserrat, sans-serif"}}>CANCHA</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {reservas.map((reserva) => (
                                <TableRow
                                key={reserva.id}
                                onClick={() => seleccionarReserva(reserva)}
                                style={{
                                    backgroundColor:
                                    selectedReserva?.id === reserva.id
                                        ? "#d3d3d3"
                                        : "transparent",
                                    cursor: "pointer",
                                }}
                                >
                                <TableCell>{reserva.id}</TableCell>
                                <TableCell>{reserva.dia}</TableCell>
                                <TableCell>{reserva.hora}:00</TableCell>
                                <TableCell>{reserva.nombrecontacto}</TableCell>
                                <TableCell>{reserva.duracion}h</TableCell>
                                <TableCell>{reserva.cancha_id}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table> 
                    </TableContainer>
                    <Box sx={{display: 'flex', width: 650, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                        <Button sx={{margin: 1, fontFamily: "Montserrat, sans-serif"}} onClick={() => abrirDialogoModificar()}>
                            Modificar Reserva
                        </Button>
                        <Button sx={{margin: 1, color: 'red', fontFamily: "Montserrat, sans-serif"}} onClick={() => eliminarReserva()}>Eliminar Reserva</Button>
                    </Box>
                    <Box sx={{display: 'flex', width: 650, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
                        <Button sx={{margin: 2, fontFamily: "Montserrat, sans-serif"}} variant="contained" color="primary" onClick={anteriorPaginaRes} disabled={paginaActualRes === 1}>
                            Anterior página
                        </Button>
                        <Typography sx={{fontFamily: "Montserrat, sans-serif"}}>Página {paginaActualRes} de {totalPaginasRes}</Typography>
                        <Button sx={{margin: 2, fontFamily: "Montserrat, sans-serif"}} variant="contained" color="primary" onClick={siguientePaginaRes} disabled={paginaActualRes === totalPaginasRes}>
                            Siguiente página
                        </Button>
                    </Box>   
                </Grid>
            </Grid>
            
            {isDialogOpen && (
                <Dialogo selectedCancha={selectedCancha} selectedReserva={selectedReserva} formData={formData} onGuardar={guardarCambios} onCancelar={cerrarDialogo} isOpen={isDialogOpen}>
                </Dialogo>
            )}
            
        </>
    );
};

export default Admin;
