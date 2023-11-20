import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Ingresar from "../components/public/Ingresar";
import Registrarse from "../components/public/Registrarse";
import Inicio from "../components/private/Inicio";
import { AuthProvider } from "../context/AuthProvider";
import LayoutPublico from "../components/public/layoutPublico";
import LayoutPrivado from "../components/private/LayoutPrivado";
import Estudios from "../components/private/Estudios";
import Proyectos from "../components/private/Proyectos";
import AgregarEstudios from "../components/private/AgregarEstudios";
import AgregarProyectos from "../components/private/AgregarProyectos";

const Routing = () => {
  //Creacion del sistema de rutas
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LayoutPublico />}>
            <Route index element={<Ingresar />} />
            <Route path="Registro" element={<Registrarse />} />
          </Route>

          <Route path="/Dashboard/" element={<LayoutPrivado />}>
            <Route index element={<Inicio />} />
            <Route path="Estudios" element={<Estudios />} />
            <Route path="AgregarEstudio" element={<AgregarEstudios />} />
            <Route path="Proyectos" element={<Proyectos />} />
            <Route path="AgregarProyectos" element={<AgregarProyectos />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routing;
