import React, { useState } from "react";
import axios from "axios";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Typography, Button, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import useFetchCanchas from "../useFetchCanchas";
import "@fontsource/montserrat";

const Dialogo = ({selectedCancha, selectedReserva, formData, onGuardar, onCancelar, isOpen}) => {
    const [data, setData] = useState(formData);
    const {
        refetchCanchas
    } = useFetchCanchas("http://localhost:8000/canchas", 10);

    const handleChange = (field) => (e) => {
        setData({ ...data, [field]: e.target.value });
    };

    const handleSubmit = async () => {
        if(selectedCancha){
            const techada = () => {
                if(data.tienetecho == "techada"){
                    return true
                }
                else{
                    return false
                }
            }
            const dataToSend = {
                ...data,
                tienetecho: techada()
            };
            try{
                const response = await axios.put(`http://localhost:8000/canchas/${selectedCancha.id}`, dataToSend);
                alert('Cancha actualizada correctamente.');
                onGuardar(response.data);
                refetchCanchas();
                cerrarDialogo();
            }
            catch(error){
                console.error('Error al guardar los datos. ', error);
                alert('Error al guardar. ');
            }
        }

        if(selectedReserva){
            try{
                const response = await axios.put(`http://localhost:8000/reservas/${selectedReserva.id}`, data);
                alert('Reserva actualizada correctamente.');
                onGuardar(response.data);
                cerrarDialogo();
            }
            catch(error){
                console.error('Error al guardar los datos. ', error);
                alert('Error al guardar. ');
            }
        }
        

        if (!selectedCancha && !selectedReserva){
            alert('Error al guardar los datos.');
        }

        
    };

    const cerrarDialogo = () => {
        onCancelar();
    }

    return (
            <>
            {selectedCancha && (
                <Dialog
                    open={isOpen}
                    onClose={cerrarDialogo}
                    sx={{width: 500, justifySelf: 'center', alignContent: 'center'}}
                >
                    <DialogTitle sx={{fontFamily: "Montserrat, sans-serif"}}>
                        Editar Cancha
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            sx={{width: '300px', margin: 1}} 
                            required
                            label='Nombre de la cancha'
                            value={data.nombre}
                            onChange={handleChange("nombre")}
                        >

                        </TextField>
                        <RadioGroup
                            row
                            value={data.tienetecho}
                            onChange={handleChange("tienetecho")}
                        >
                            <FormControlLabel value="techada" control={<Radio />} label="Sí" />
                            <FormControlLabel value="notechada" control={<Radio />} label="No" />
                        </RadioGroup>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSubmit} sx={{fontFamily: "Montserrat, sans-serif"}}>
                            Guardar cambios
                        </Button>
                        <Button onClick={cerrarDialogo} sx={{fontFamily: "Montserrat, sans-serif", color: 'red'}}>
                            Cancelar
                        </Button>
                    </DialogActions>
                </Dialog>
                
            )}
        </>
        );
        
}

export default Dialogo;