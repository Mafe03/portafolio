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
  tipo,
  detalle,
  fechaFin,
  notas,
  setEditar,
}) => {
  const { form, cambiar } = HelperForm({});
  const token = localStorage.getItem("token");
  const Editar = async (e) => {
    e.preventDefault();
    let formulario = form;
    if (formulario.notas == null) {
      MySwal.fire({
        title: <strong>Error</strong>,
        html: <i>Porfavor seleccione una nota</i>,
        icon: "error",
      });
    } else {
      const request = await fetch(Global.url + `estudios/editar/${id}`, {
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
        let nombreError = data.tituloError;
        let mensaje = data.mensajeError;
        MySwal.fire({
          title: <strong> {nombreError}</strong>,
          html: <i>{mensaje}</i>,
          icon: "error",
        });
      }
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Estudio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="user" onSubmit={Editar}>
            <div className="form-group">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control bg-light border-0 small"
                  id="exampleInputEmail"
                  placeholder="tipo"
                  name="tipo"
                  aria-label=""
                  aria-describedby="basic-addon2"
                  onChange={cambiar}
                  defaultValue={tipo}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control bg-light border-0 small"
                id="exampleInputEmail"
                aria-label=""
                aria-describedby="basic-addon2"
                name="detalle"
                placeholder="Detalle"
                onChange={cambiar}
                defaultValue={detalle}
              />
            </div>
            <label>Fecha fin</label>
            <div className="form-group">
              <input
                type="date"
                className="form-control bg-light border-0 small"
                placeholder="Fecha Fin"
                aria-label=""
                aria-describedby="basic-addon2"
                id="fechaFin"
                name="fechaFin"
                defaultValue={fechaFin}
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
                <option hidden disabled selected>
                  Seleccione una nota
                </option>
                <option value="Aprobado">Aprobado</option>
                <option value="No Aprobado">No Aprobado</option>
              </select>
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
