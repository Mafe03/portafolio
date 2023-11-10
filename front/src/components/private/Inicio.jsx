import React, { Component, useState } from "react";
import { NavLink } from "react-router-dom";
import UseAuth from "../../helpers/UseAuth";

const Inicio = () => {
  const { Autenticado } = UseAuth();
  return (
    <>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Inicio</h1>
        </div>

        <div className="row">
          <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Mis Datos</h6>
              </div>
              <div className="card-body">
                <p>
                  SB Admin 2 makes extensive use of Bootstrap 4 utility
                  classNamees in order to reduce CSS bloat and poor page
                  performance. Custom CSS classNamees are used to create custom
                  components and custom utility classNamees.
                </p>
                <p className="mb-0">
                  Before working with this theme, you should become familiar
                  with the Bootstrap framework, especially the utility
                  classNamees.
                </p>
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
