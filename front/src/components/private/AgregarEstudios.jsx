import React, { Component, useState } from "react";
import UseAuth from "../../helpers/UseAuth";
import { NavLink } from "react-router-dom";
import HelperForm from "../../helpers/HelperForm";
import { Global } from "../../helpers/Global";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const AgregarEstudios = () => {
  const { Autenticado } = UseAuth();
  const { form, cambiar } = HelperForm({});
  const token = localStorage.getItem("token");

  const guardarEstudio = async (e) => {
    e.preventDefault();
    let nuevoEstudio = form;
    //guardar en la api
    const request = await fetch(Global.url + "estudios/registrar", {
      method: "POST",
      body: JSON.stringify(nuevoEstudio),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const data = await request.json();

    if (data.status == "ok") {
      let titulo = data.titulo;
      let mensaje = data.mensaje;
      MySwal.fire({
        title: <strong> {titulo}</strong>,
        html: <i>{mensaje}</i>,
        icon: "success",
      });
      setTimeout(() => {
        window.location = "./Estudios";
      }, 1000);
    } else {
      let titulo = data.Encabezado;
      let mensaje = data.mensaje;
      MySwal.fire({
        title: <strong> {titulo}</strong>,
        html: <i>{mensaje}</i>,
        icon: "error",
      });
      // console.log(data);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Agregar Estudios</h1>
        </div>

        <div className="row">
          <div className="col-lg-2 mb-4"></div>
          <div className="col-lg-8 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary text-center">
                  Datos de estudio
                </h6>
              </div>
              <div className="card-body">
                <form
                  action=""
                  onSubmit={guardarEstudio}
                  className="w-75 m-auto text-center"
                >
                  <div className="input-group mb-4 mt-3">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Tipo de Estudio"
                      aria-label=""
                      aria-describedby="basic-addon2"
                      id="tipo"
                      name="tipo"
                      required
                      onChange={cambiar}
                    />
                  </div>
                  <div className="input-group mb-4">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Detalle"
                      aria-label=""
                      aria-describedby="basic-addon2"
                      id="detalle"
                      name="detalle"
                      required
                      onChange={cambiar}
                    />
                  </div>
                  <div className="input-group mb-4">
                    <input
                      type="date"
                      className="form-control bg-light border-0 small"
                      placeholder="Fecha Fin"
                      aria-label=""
                      aria-describedby="basic-addon2"
                      id="fechaFin"
                      name="fechaFin"
                      required
                      onChange={cambiar}
                    />
                  </div>
                  <div className="input-group mb-4">
                    <select
                      name="notas"
                      id="notas"
                      className="form-control bg-light border-0 small"
                      placeholder="Nota"
                      aria-label=""
                      aria-describedby="basic-addon2"
                      onChange={cambiar}
                      required
                    >
                      <option value="N/A">Seleccione una nota</option>
                      <option value="Aprobado">Aprobado</option>
                      <option value="No Aprobado">No Aprobado</option>
                    </select>
                  </div>

                  <button className="btn btn-primary">Agregar Estudio</button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-2 mb-4"></div>
        </div>
      </div>
    </>
  );
};

export default AgregarEstudios;
