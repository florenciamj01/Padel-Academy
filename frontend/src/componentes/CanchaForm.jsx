import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import { TextField, Box } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Tooltip from '@mui/material/Tooltip';
import {IconButton} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "@fontsource/montserrat";

const CanchaForm = () => {
    const [formData, setFormData] = useState({
    nombre: "",
    tienetecho: false
    });

    const navigate = useNavigate();

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleSubmit = (e) => {
        const techada = () => {
            if(formData.tienetecho == "techada"){
                return true
            }
            else{
                return false
            }
        }
        const dataToSend = {
                    ...formData,
                    tienetecho: techada()
                };
        axios.post("http://localhost:8000/canchas/", dataToSend).then(() => {
            alert("Cancha creada con éxito");
            })
            .catch((error) => {
            console.error("Error al crear la cancha:", error);
            alert("Error al crear la cancha. Intenta nuevamente."); 
        });
    }

    return (
    <>
    <Tooltip title='Volver'>
        <IconButton onClick={() => navigate('/')} sx={{}}>
            <ArrowBackIcon />
        </IconButton>
    </Tooltip>
    <Box sx={{justifyItems: 'center', display: 'block'}}>
    <Paper sx={{width: 500, height: 300, padding: 2, justifyItems: 'center'}}>
        <Typography variant="h5" sx={{marginBottom: 2, fontFamily: "Montserrat, sans-serif"}}>
            Crear una cancha
        </Typography>
        
        <FormControl sx={{margin: 2}}>
            <TextField 
                sx={{width: 450, marginBottom: 2}} 
                required
                label='Nombre de la cancha'
                value={formData.nombre}
                onChange={handleChange("nombre")}
            >  
            </TextField>
            <Box sx={{display: 'flex'}}>
            <FormLabel sx={{marginTop: 1, marginRight: 3, fontFamily: "Montserrat, sans-serif"}}>¿Tiene techo?</FormLabel>
            <RadioGroup
                row
                value={formData.tienetecho}
                onChange={handleChange("tienetecho")}
            >
                <FormControlLabel value="techada" control={<Radio />} label="Sí" />
                <FormControlLabel value="notechada" control={<Radio />} label="No" />
            </RadioGroup>
            </Box>
            <Button sx={{marginTop: 4, fontFamily: "Montserrat, sans-serif"}} variant="contained" color="primary" onClick={handleSubmit}>
                Agregar
            </Button>
            
        </FormControl>
        
    </Paper>
    </Box>
    
    </>
    );
};

export default CanchaForm;