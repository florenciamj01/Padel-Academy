import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "@fontsource/montserrat";
import Tooltip from '@mui/material/Tooltip';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from 'react-router-dom';

const GaleriaImagenes = ({ images, itemsPerView = 3 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const maxIndex = Math.ceil(images.length / itemsPerView) - 1;

    const navigate = useNavigate();

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? maxIndex : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex === maxIndex ? 0 : prevIndex + 1
        );
    };

    const visibleImages = images.slice(
        currentIndex * itemsPerView,
        currentIndex * itemsPerView + itemsPerView
    );

    return (
        <>
        <Box sx={{display: 'flex',
        backgroundColor: 'Highlight'
        }}>
        <Tooltip title='Volver'>
            <IconButton onClick={() => navigate('/')} sx={{color: 'white'}}>
                <ArrowBackIcon />
            </IconButton>
        </Tooltip>
        <Typography sx={{
            textAlign: 'center',
            backgroundColor: 'Highlight',
            color: 'white',
            padding: 2,
            fontFamily: "Montserrat, sans-serif",
            width: '100%',
            marginLeft: -4
        }}>
            Galería de imágenes de nuestras instalaciones y nuestros socios
        </Typography>
        </Box>
        <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        
        sx={{ width: "100%", height: "400px", overflow: "hidden", marginTop: 2,  top: "50%", // Centra verticalmente
            left: "50%", 
            transform: "translate(-50%, -50%)", }}
        >
        
            <IconButton
                onClick={handlePrev}
                sx={{
                position: "absolute",
                left: 10,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                },
                }}
            >
                <ArrowBackIos />
            </IconButton>

            <Box
                display="flex"
                gap={2}
                justifyContent={'center'}
                alignItems={'center'}
                position={'relative'}
                sx={{
                width: "80%",
                height: "100%",
                }}
            >
                {visibleImages.map((image, index) => (
                <Box
                    key={index}
                    component="img"
                    src={image}
                    alt={`Imagen ${currentIndex * itemsPerView + index + 1}`}
                    sx={{
                    width: `calc(100% / ${itemsPerView} - 10px)`,
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 2,
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                    }}
                />
                ))}
            </Box>

            <IconButton
                onClick={handleNext}
                sx={{
                position: "absolute",
                right: 10,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                },
                }}
            >
                <ArrowForwardIos />
            </IconButton>
        </Box>
        </>
    );
};

export default GaleriaImagenes;
