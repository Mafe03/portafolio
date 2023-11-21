import React, { Component, useState } from "react";
import UseAuth from "../../helpers/UseAuth";
import { NavLink } from "react-router-dom";
import HelperForm from "../../helpers/HelperForm";
import { Global } from "../../helpers/Global";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const AgregarProyectos = () => {
  const { Autenticado } = UseAuth();
  const { form, cambiar } = HelperForm({});
  const token = localStorage.getItem("token");

  const guardarProyecto = async (e) => {
    e.preventDefault();
    let nuevoProyecto = form;
    //guardar en la api
    const request = await fetch(Global.url + "proyectos/registrar", {
      method: "POST",
      body: JSON.stringify(nuevoProyecto),
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
        window.location = "./Proyectos";
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
          <h1 className="h3 mb-0 text-gray-800">Agregar Proyectos</h1>
        </div>

        <div className="row">
          <div className="col-lg-2 mb-4"></div>
          <div className="col-lg-8 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary text-center">
                  Datos de Proyecto
                </h6>
              </div>
              <div className="card-body">
                <form
                  action=""
                  onSubmit={guardarProyecto}
                  className="w-75 m-auto text-center"
                >
                  <div className="input-group mb-4 mt-3">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Nombre del Proyecto"
                      aria-label=""
                      aria-describedby="basic-addon2"
                      id="nombre"
                      name="nombre"
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
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Link"
                      aria-label=""
                      aria-describedby="basic-addon2"
                      id="link"
                      name="link"
                      required
                      onChange={cambiar}
                    />
                  </div>
                  <button className="btn btn-primary">Agregar Proyecto</button>
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

export default AgregarProyectos;
