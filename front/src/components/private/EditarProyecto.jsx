import React, { Component, useState } from "react";
import HelperForm from "../../helpers/HelperForm";
import { Global } from "../../helpers/Global";
import Swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal2);
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

function EditarProyecto({
  show,
  handleClose,
  id,
  nombre,
  detalle,
  link,
  setEditar,
}) {
  const { form, cambiar } = HelperForm({});
  const token = localStorage.getItem("token");

  const Editar = async (e) => {
    e.preventDefault();
    let formulario = form;
    const request = await fetch(Global.url + `proyectos/editar/${id}`, {
      method: "PUT",
      body: JSON.stringify(formulario),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const data = await request.json();
    if (data.id == 200) {
      let titulo = data.Encabezado;
      let mensaje = data.mensaje;
      MySwal.fire({
        title: <strong> {titulo}</strong>,
        html: <i>{mensaje}</i>,
        icon: "success",
      });
      setEditar(0);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      let titulo = data.Encabezado;
      let mensaje = data.mensaje;
      MySwal.fire({
        title: <strong> {titulo}</strong>,
        html: <i>{mensaje}</i>,
        icon: "error",
      });
    }
  };

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} responsive="lg">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Editar Proyecto</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form className="user" onSubmit={Editar}>
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
                defaultValue={nombre}
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
                defaultValue={detalle}
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
                defaultValue={link}
              />
            </div>
            <button className="btn btn-primary">Agregar Proyecto</button>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default EditarProyecto;
