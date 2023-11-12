import React, { Component, useState } from "react";
import { NavLink } from "react-router-dom";
import UseAuth from "../../helpers/UseAuth";
import HelperForm from "../../helpers/HelperForm";
import { Global } from "../../helpers/Global";

const Estudios = () => {
  const { Autenticado } = UseAuth();
  const [estudios, setEstudios] = useState(null);
  const token = localStorage.getItem("token");

  fetch(Global.url + "estudios/listar", {
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.resultado.length == 0) {
        console.log("ACA ESTA");
        setEstudios(null);
      } else {
        setEstudios(data.resultado);
        console.log(estudios);
      }

      //console.log("DATA PERFILES", data.perfiles);
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });

  return (
    <>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Estudios</h1>
          <NavLink to="/Dashboard/AgregarEstudio" className="btn btn-primary">
            Agregar Estudio
          </NavLink>
        </div>

        <div className="row">
          <div className="col-lg-12 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary text-center">
                  Mis Estudios
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
                        <th>Tipo</th>
                        <th>Detalle</th>
                        <th>Fecha Fin</th>
                        <th>Notas</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Tiger Nixon</td>
                        <td>System Architect</td>
                        <td>Edinburgh</td>
                        <td>61</td>
                        <td>61</td>
                        <td>61</td>
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

export default Estudios;
