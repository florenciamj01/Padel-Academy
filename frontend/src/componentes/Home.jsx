import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import Menu from "./Menu";
import image from '../fotos/padel8.jpg'
import "@fontsource/montserrat";

const bgimage = image;
const Home = () => {

    return (
    <Box sx={{
        flexGrow: 1,
        backgroundImage: `url(${bgimage})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        position: 'relative',
        height: "100vh", 
        width: "100vw",  
    }}>
    
    <AppBar position="static">
        <Toolbar>
            <Menu></Menu>
            <Typography variant="h3" component="div" sx={{textAlign: 'center', flexGrow: 1, ml: -5, fontFamily: "Montserrat, sans-serif", padding: 1 }}>
            Página de reservas de Pádel Academy
            </Typography>
        </Toolbar>
        </AppBar>
    
    </Box>
    );
};

export default Home;
