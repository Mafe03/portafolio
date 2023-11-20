import React, { Component, useState } from "react";
import { NavLink } from "react-router-dom";
import UseAuth from "../../helpers/UseAuth";

const Proyectos = () => {
  const { Autenticado } = UseAuth();
  return (
    <>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Proyectos</h1>
          <NavLink to="/Dashboard/AgregarProyectos" className="btn btn-primary">
            Agregar Proyecto
          </NavLink>
        </div>

        <div className="row">
          <div className="col-lg-12 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary text-center">
                  Mis Proyectos
                </h6>
              </div>
              <div className="card-body">
                <div class="table-responsive">
                  <table
                    class="table table-bordered"
                    id="dataTable"
                    width="100%"
                    cellspacing="0"
                  >
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Detalle</th>
                        <th>Link</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Tiger Nixon</td>
                        <td>System Architect</td>
                        <td>Edinburgh</td>
                        <td>Edinburgh</td>
                        <td>Edinburgh</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Proyectos;
