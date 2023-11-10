import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import UseAuth from "../../helpers/UseAuth";
import AsideD from "./AsideD";
import NavBar from "./NavBar";

const LayoutPrivado = () => {
  const { Autenticado } = UseAuth();
  return (
    <>
      <div id="wrapper">
        <AsideD />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <NavBar />
            {Autenticado.id ? <Outlet /> : <Navigate to="/" />}
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutPrivado;
