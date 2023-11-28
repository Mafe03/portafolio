import React, { Component, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UseAuth from "../../helpers/UseAuth";
import HelperForm from "../../helpers/HelperForm";
import { Global } from "../../helpers/Global";
import { format } from "date-fns";
import user from "../../assets/img/user.png";

const Inicio = () => {
  const { Autenticado } = UseAuth();
  const datos = JSON.parse(localStorage.getItem("user"));
  const fechaOriginal = new Date(datos.fechaNace);
  const fechaFormateada = format(fechaOriginal, "yyyy-MM-dd");
  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <div className="col-7 mb-4">
            <div className="card shadow mb-4 mt-5">
              <div className="card-header py-3">
                <h4 className="m-0 font-weight-bold" id="titulos">
                  Mis Datos
                </h4>
              </div>
              <div className="card-body d-flex ">
                <div className="col-7">
                  <h5 className="mb-3">
                    Nombre: {datos.nombre} {datos.apellidos}
                  </h5>
                  <h5 className="mb-3">
                    Fecha de nacimiento: {fechaFormateada}
                  </h5>
                  <h5 className="mb-3">Dirección: {datos.direccion}</h5>
                  <h5 className="mb-3">Correo: {datos.email}</h5>
                  <h5>Telefono: {datos.telefono}</h5>
                </div>
                <div className="col-5">
                  <img src={user} alt="" style={{ width: 200 }} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-4"></div>
        </div>
      </div>
    </>
  );
};

export default Inicio;
