import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import useFetchReservas from "../useFetchReservas";
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import {IconButton} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "@fontsource/montserrat";

const ReservasList = () => {
    const {
        reservas,
        paginaActualRes,
        totalPaginasRes,
        siguientePaginaRes,
        anteriorPaginaRes,
    } = useFetchReservas("http://localhost:8000/reservas", 10);

    const navigate = useNavigate();

    const formatearFecha = (fecha) => {
            const [anio, mes, dia] = fecha.split("-");
            const fechaObjeto = new Date(anio, mes - 1, dia); // Resta 1 al mes

            const fechaFormateada = `${dia.padStart(2, "0")}-${mes.padStart(2, "0")}-${anio}`;

            const diasDeLaSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
            const diaDeLaSemana = diasDeLaSemana[fechaObjeto.getDay()];

            return { fechaFormateada, diaDeLaSemana };
        } 

    const agruparPorFecha = (reservas) => {
        return reservas.reduce((grupos, reserva) => {
            const { dia } = reserva;
            if (!grupos[dia]) {
            grupos[dia] = []; 
            }
            grupos[dia].push(reserva); 
            return grupos;
        }, {});
        };
    
        const reservasAgrupadas = () => {
            const reservasAgrupadas = agruparPorFecha(reservas);
            const fechasOrdenadas = Object.keys(reservasAgrupadas).sort((a, b) => new Date(a) - new Date(b));

            return (
                <>
                <Box 
                sx={{
                    display: "block",
                    alignSelf: 'center',
                    justifySelf: 'center',
                    height: "100vh",
                }}>
                    <Typography variant="h5" sx={{marginBottom: 1, textAlign: 'center', fontFamily: "Montserrat, sans-serif"}}>
                        Reservas por fecha
                    </Typography>
                    <Box>
                    <Table sx={{overflowY: 'auto', width: '1000px', height: '500px'}}>
                        <TableHead sx={{backgroundColor: 'dimgrey'}}>
                            <TableRow>
                                <TableCell>
                                    <Typography sx={{color: 'white', fontFamily: "Montserrat, sans-serif"}}>
                                        Fecha
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{color: 'white', fontFamily: "Montserrat, sans-serif"}}>
                                        Hora
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{color: 'white', fontFamily: "Montserrat, sans-serif"}}>
                                        Duración
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{color: 'white', fontFamily: "Montserrat, sans-serif"}}>
                                        ID cancha
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            
                            {fechasOrdenadas.map((fecha) => (
                                <>
                                {reservasAgrupadas[fecha].map((reserva) => (
                                    <TableRow>
                                        <TableCell sx={{fontFamily: "Montserrat, sans-serif"}}>
                                            {formatearFecha(fecha).fechaFormateada}
                                        </TableCell>
                                        
                                        <TableCell sx={{fontFamily: "Montserrat, sans-serif"}}>
                                            🕒 {reserva.hora}:00
                                        </TableCell>
                                        <TableCell sx={{fontFamily: "Montserrat, sans-serif"}}>
                                            {reserva.duracion}h
                                        </TableCell>
                                        <TableCell sx={{fontFamily: "Montserrat, sans-serif"}}>
                                            {reserva.cancha_id}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </>
                            ))} 
                        </TableBody>

                    </Table>
                    <Box sx={{justifySelf: 'center'}}>
                    <Button sx={{marginRight: 1, fontFamily: "Montserrat, sans-serif"}} variant="contained" onClick={anteriorPaginaRes} disabled={paginaActualRes === 1}>
                        Anterior
                    </Button>
                    <span>Página {paginaActualRes} de {totalPaginasRes}</span>
                    <Button sx={{marginLeft: 1, fontFamily: "Montserrat, sans-serif"}} variant="contained" onClick={siguientePaginaRes} disabled={paginaActualRes === totalPaginasRes}>
                        Siguiente
                    </Button>
                    </Box>
                    </Box>
                </Box>
            </>
            );
        };

    return (
    <>
    <Tooltip title='Volver'>
        <IconButton onClick={() => navigate('/')} sx={{}}>
            <ArrowBackIcon />
        </IconButton>
    </Tooltip>
    {reservas.length === 0 ? (
        <Typography variant="h4">No hay reservas disponibles.</Typography>
        ) : (
        reservasAgrupadas()
    )}
    </>
    );
    
};

export default ReservasList;
