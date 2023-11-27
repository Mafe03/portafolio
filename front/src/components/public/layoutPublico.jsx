import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import UseAuth from "../../helpers/UseAuth";

const LayoutPublico = () => {
  const { Autenticado } = UseAuth();
  return (
    <>
      {!Autenticado || !Autenticado.id ? (
        <Outlet />
      ) : (
        <Navigate to="/Dashboard" />
      )}
    </>
  );
};

export default LayoutPublico;
