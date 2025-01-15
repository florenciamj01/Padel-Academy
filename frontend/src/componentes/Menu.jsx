import React, { useState } from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import "@fontsource/montserrat";

const Menu = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleOpenDrawer = (open) => () => {
        setIsOpen(open);
    }

    return(
        <>
        <Tooltip title='Menú'>
            <IconButton 
            onClick={handleOpenDrawer(true)}
            color="inherit"
            >
                <MenuIcon></MenuIcon>
            </IconButton>
        </Tooltip>
        <Drawer anchor="left" open={isOpen} onClose={handleOpenDrawer(false)}>
            <Box sx={{display: 'block'}}>
                <Tooltip title='Volver'>
                    <IconButton onClick={handleOpenDrawer(false)}>
                        <ArrowBackIcon />
                    </IconButton>
                </Tooltip>
                <List>
                    <ListItem>
                        <ListItemButton href="/canchas" >
                            <Typography sx={{fontFamily: "Montserrat, sans-serif"}}>
                                Ver canchas
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton href="/reservas" >
                            <Typography sx={{fontFamily: "Montserrat, sans-serif"}}>
                                Ver reservas
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton href="/reservar">
                            <Typography sx={{fontFamily: "Montserrat, sans-serif"}}>
                                Hacer una reserva
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton href="/agregarcancha" >
                            <Typography sx={{fontFamily: "Montserrat, sans-serif"}}>
                                Agregar una cancha
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton href="/galeria" >
                            <Typography sx={{fontFamily: "Montserrat, sans-serif"}}>
                                Galeria
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <Divider></Divider>
                    <ListItem>
                        <ListItemButton href="/admin" >
                            <Typography sx={{fontFamily: "Montserrat, sans-serif"}}>
                                Administrar
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    
                </List>
            </Box>
            
        </Drawer>
    </>
    );
}

export default Menu;

