import React, { Component, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UseAuth from "../../helpers/UseAuth";
import HelperForm from "../../helpers/HelperForm";
import { Global } from "../../helpers/Global";
import EditarEstudio from "./EditarEstudio";
import Swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal2);

const Estudios = () => {
  const { Autenticado } = UseAuth();
  const token = localStorage.getItem("token");
  const [estudios, setEstudios] = useState(null);
  const [Editar, setEditar] = useState(0);
  const [page, setPage] = useState(1);
  const [totalp, setTotalp] = useState(null);

  useEffect(() => {
    listarEstudios();
  }, []);

  const listarEstudios = async (nextPage = 1) => {
    const request = await fetch(Global.url + "/estudios/listar/" + nextPage, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();
    setTotalp(data.totalPaginas);
    if (data.status === "ok") {
      setEstudios(data.estudios);
    }
  };

  const NextPage = () => {
    if (page >= totalp) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "No hay mas información disponible",
      });
    } else {
      let next = page + 1;
      setPage(next);
      listarEstudios(next);
    }
  };

  const AntPage = () => {
    if (page == 1) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Ya te encuentras en la primer pagina",
      });
    } else {
      let next = page - 1;
      setPage(next);
      listarEstudios(next);
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const eliminarEstudio = (id, nombre) => {
    MySwal.fire({
      title: `¿ Quieres eliminar el Estudio ${nombre} ?`,
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(Global.url + `estudios/borrarUno/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `${token}`,
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.id == 200) {
              MySwal.fire({
                title: <strong>Eliminado</strong>,
                html: <i>Estudio Eliminado Correctamente</i>,
                icon: "success",
              });
            }
            setTimeout(() => {
              window.location = "";
            }, 500);
          });
      } else if (result.isDenied) {
        MySwal.fire("Se Cancelo la Eliminacion", "", "info");
      }
    });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Estudios</h1>
          <NavLink to="/Dashboard/AgregarEstudio" className="btn" id="botones">
            <i className="bi bi-plus-square-dotted"></i> Agregar Estudio
          </NavLink>
        </div>

        <div className="row">
          <div className="col-lg-12 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-center" id="titulos">
                  Mis Estudios
                </h6>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    className="table table-bordered"
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
                      {estudios != null ? (
                        estudios.map((estudio) => {
                          return (
                            <tr key={estudio._id}>
                              <td>{estudio.tipo}</td>
                              <td>{estudio.detalle}</td>
                              <td>{estudio.fechaFin}</td>
                              <td>{estudio.notas}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn"
                                  id="botones"
                                  onClick={() => {
                                    setEditar(estudio._id);
                                    handleShow();
                                  }}
                                >
                                  <i className="bi bi-pencil-square"></i>
                                </button>
                                {Editar === estudio._id && (
                                  <EditarEstudio
                                    show={show}
                                    handleClose={handleClose}
                                    id={estudio._id}
                                    tipo={estudio.tipo}
                                    detalle={estudio.detalle}
                                    fechaFin={estudio.fechaFin}
                                    notas={estudio.notas}
                                    setEditar={setEditar}
                                  ></EditarEstudio>
                                )}
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => {
                                    eliminarEstudio(estudio._id, estudio.tipo);
                                  }}
                                >
                                  <i className="bi bi-trash-fill"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <h1
                          className="text-center"
                          style={{ textAlign: "center" }}
                        >
                          No se encontraron estudios registrados
                        </h1>
                      )}
                    </tbody>
                  </table>
                  <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                      <li className="page-item">
                        <button
                          id="anterior"
                          onClick={AntPage}
                          className="page-link"
                        >
                          Anterior
                        </button>
                      </li>
                      <li className="page-item">
                        <button
                          id="siguiente"
                          onClick={NextPage}
                          className="page-link"
                          href="#"
                        >
                          Siguiente
                        </button>
                      </li>
                    </ul>
                  </nav>
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
