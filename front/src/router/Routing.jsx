import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Ingresar from "../components/logica/Ingresar";
import Registrarse from "../components/logica/Registrarse";
import Inicio from "../components/layout/Inicio";
import Estudios from "../components/layout/Estudios";
import Proyectos from "../components/layout/Proyectos";

const Routing = () => {
  //Creacion del sistema de rutas
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Ingresar" element={<Ingresar />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Registro" element={<Registrarse />} />
        <Route path="/Estudios" element={<Estudios />} />
        <Route path="/Proyectos" element={<Proyectos />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
