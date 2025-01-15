import React from "react";
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import useFetchCanchas from "../useFetchCanchas";
import Box from '@mui/material/Box';
import "@fontsource/montserrat";
import Tooltip from '@mui/material/Tooltip';
import {IconButton} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CanchasList = () => {
    const {
        canchas,
        paginaActual,
        totalPaginas,
        siguientePagina,
        anteriorPagina,
    } = useFetchCanchas("http://localhost:8000/canchas", 10);

    const navigate = useNavigate();
    
    return (
    <>
    <Box sx={{
        display: 'flex',
        backgroundColor: 'Highlight'
    }}>
        <Tooltip title='Volver'>
            <IconButton onClick={() => navigate('/')} sx={{color: 'white'}}>
                <ArrowBackIcon />
            </IconButton>
        </Tooltip>
        <Typography sx={{
            width: '100%',
            textAlign: 'center',
            color: 'white',
            padding: 2,
            fontFamily: "Montserrat, sans-serif",
            marginLeft: -5
        }}>
            Listado de canchas
        </Typography>
    
    </Box>
    <Paper>
        
        <Table>
        <TableHead sx={{backgroundColor: 'dimgrey'}}>
            <TableRow>
                <TableCell>
                    <Typography sx={{color: 'white', fontFamily: "Montserrat, sans-serif"}}>
                        ID
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography sx={{color: 'white', fontFamily: "Montserrat, sans-serif"}}>
                        Nombre
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography sx={{color: 'white', fontFamily: "Montserrat, sans-serif"}}>
                        Tiene techo
                    </Typography>
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {canchas.map((cancha) => (
            <TableRow
                key={cancha.id}
            >
                <TableCell>{cancha.id}</TableCell>
                <TableCell>{cancha.nombre}</TableCell>
                <TableCell>{cancha.tienetecho ? "Si" : "No"}</TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    
    </Paper>
    <Box sx={{justifySelf: 'center'}}>
        <Button sx={{marginRight: 1, fontFamily: "Montserrat, sans-serif"}} variant="contained" onClick={anteriorPagina} disabled={paginaActual === 1}>
            Anterior
        </Button>
        <span>Página {paginaActual} de {totalPaginas}</span>
        <Button sx={{marginLeft: 1, fontFamily: "Montserrat, sans-serif"}} variant="contained" onClick={siguientePagina} disabled={paginaActual === totalPaginas}>
            Siguiente
        </Button>
    </Box>
    </>
    );
};

export default CanchasList;
