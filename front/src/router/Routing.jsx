import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Ingresar from "../components/logica/Ingresar";

import Registrarse from "../components/logica/Registrarse";

const Routing = () => {
  //Creacion del sistema de rutas
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Ingresar" element={<Ingresar />} />
        <Route path="/Registro" element={<Registrarse />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
