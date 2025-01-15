import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { TextField, Box, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Tooltip from '@mui/material/Tooltip';
import {IconButton} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import "@fontsource/montserrat";


const ReservaForm = () => {
    const [formData, setFormData] = useState({
    dia: "",
    hora: "",
    duracion: "",
    nombrecontacto: "",
    telefonocontacto: "",
    cancha_id: "",
    });
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();

    const handleOpenDialog = () => {
        setOpen(true);
    }

    const handleCloseDialog = () => {
        setOpen(false);
    }

    const handleChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value,
        });
    };

    const handleDateChange = (newValue) => {
        setFormData({
        ...formData,
        dia: newValue,
        });
    };

    const handleSubmit = () => {
        const dataToSend = {
            ...formData,
            dia: formData.dia ? dayjs(formData.dia).format("YYYY-MM-DD") : "",
            hora: parseInt(formData.hora, 10),
            duracion: parseInt(formData.duracion)
        };
        axios.post("http://localhost:8000/reservas/", dataToSend).then(() => {
            alert("Reserva creada con éxito");
            })
            .catch((error) => {
            console.error("Error al crear la reserva:", error);
            alert("Error al crear la reserva. Intenta nuevamente (sugerencia: cambia de cancha u horario)"); 
        });
        handleCloseDialog();
    }

    return (
    <>
    <Tooltip title='Volver'>
        <IconButton onClick={() => navigate('/')} sx={{}}>
            <ArrowBackIcon />
        </IconButton>
    </Tooltip>
    <Box sx={{justifyItems: 'center'}}>
    <Paper
        sx={{width: 500, height: 400, padding: 2, justifyItems: 'center'}}
    >
        <Typography variant="h3" sx={{marginBottom: 2, fontFamily: "Montserrat, sans-serif"}}>
            Cargar reserva
        </Typography>
        
        <FormControl>
            <Box sx={{display: 'block', width: 500, height: 250, textAlign: 'center'}}>
                <Box sx={{display: 'flex', justifyContent:'center'}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box sx={{width: '250px', margin: 1}}>
                        <DatePicker
                        label="Seleccionar fecha"
                        value={formData.dia}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                        />
                        </Box>
                    </LocalizationProvider>
                    <TextField
                    sx={{width: '170px', margin: 1}} 
                    required
                    label='Hora'
                    value={formData.hora}
                    onChange={handleChange('hora')}
                    >
                    </TextField>
                </Box>
                <TextField
                sx={{width: '210px', margin: 1}} 
                required
                label='Duración'
                value={formData.duracion}
                onChange={handleChange('duracion')}
                >
                </TextField>
                <TextField
                sx={{width: '210px', margin: 1}} 
                required
                label='Nombre del cliente'
                value={formData.nombrecontacto}
                onChange={handleChange('nombrecontacto')}
                >
                </TextField>
                <TextField 
                sx={{width: '210px', margin: 1}}
                required
                label='Teléfono del cliente'
                value={formData.telefonocontacto}
                onChange={handleChange('telefonocontacto')}
                >
                </TextField>
                <TextField 
                sx={{width: '210px', margin: 1}}
                required
                label='ID de la cancha'
                value={formData.cancha_id}
                onChange={handleChange('cancha_id')}
                >
                </TextField>
            </Box>
        </FormControl>
        <Box sx={{justifyItems: 'end'}}>
            <Button variant='outlined' color="error" onClick={handleCloseDialog} sx={{margin: 1, fontFamily: "Montserrat, sans-serif"}}>
                Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{margin: 1, fontFamily: "Montserrat, sans-serif"}}>
                Guardar reserva
            </Button>
        </Box>
    </Paper>
    </Box>
    </>
    );
};

export default ReservaForm;
