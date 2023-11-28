import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { Component, useState } from "react";
import HelperForm from "../../helpers/HelperForm";
import { Global } from "../../helpers/Global";
import Swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal2);

const ModalEditar = ({
  show,
  handleClose,
  id,
  nombre,
  detalle,
  link,
  setEditar,
}) => {
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
    if (data.resultado == "success") {
      let titulo = data.titulo;
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
      let nombreError = data.nombreError;
      let mensaje = data.Mensaje;
      MySwal.fire({
        title: <strong> {nombreError}</strong>,
        html: <i>{mensaje}</i>,
        icon: "error",
      });
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={Editar}>
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
            <div className="form-group">
              <input
                type="text"
                className="form-control bg-light border-0 small"
                aria-label=""
                aria-describedby="basic-addon2"
                id="link"
                placeholder="Link"
                name="link"
                onChange={cambiar}
                defaultValue={link}
                required
              />
            </div>

            <hr />
            <div className="text-center">
              <button type="submit" className="btn" id="botones">
                Editar
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalEditar;
