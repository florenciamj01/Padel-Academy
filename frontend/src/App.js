import React from "react";
import './AppStyles.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./componentes/Home";
import CanchasList from "./componentes/CanchasList";
import ReservasList from "./componentes/ReservasList";
import ReservaForm from "./componentes/ReservaForm";
import Admin from "./componentes/Admin";
import CanchaForm from "./componentes/CanchaForm";
import GaleriaImagenes from "./componentes/GaleriaImagenes";
import images from "./imagenes";
import Box from '@mui/material/Box';


const App = () => {

  return (
    <>
    <Box>
    <Box >
      <Router>
        <Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/canchas" element={<CanchasList />} />
          <Route path="/reservas" element={<ReservasList />} />
          <Route path="/reservar" element={<ReservaForm />} />
          <Route path="/agregarcancha" element={<CanchaForm/>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/galeria" element={<GaleriaImagenes images={images}/>} />
        </Routes>
      </Box>
    </Router>
    </Box>
    
    </Box>
    </>
  );
};

export default App;

