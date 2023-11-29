import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UseAuth from "../../helpers/UseAuth";
import { Global } from "../../helpers/Global";
import Swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import EditarProyecto from "./EditarProyecto";

const MySwal = withReactContent(Swal2);

const Proyectos = () => {
  const { Autenticado } = UseAuth();
  const token = localStorage.getItem("token");

  const [proyectos, setProyectos] = useState(null);
  const [Editar, setEditar] = useState(0);
  const [page, setPage] = useState(1);
  const [totalp, setTotalp] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    listarProyectos();
  }, []);

  const listarProyectos = async (nextPage = 1) => {
    const request = await fetch(Global.url + "/proyectos/listar/" + nextPage, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();
    setTotalp(data.totalPaginas);
    if (data.status === "ok") {
      setProyectos(data.proyectos);
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
      listarProyectos(next);
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
      listarProyectos(next);
    }
  };

  const eliminarProyecto = (id, nombre) => {
    MySwal.fire({
      title: `¿ Quieres eliminar el proyecto de ${nombre} ?`,
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(Global.url + `proyectos/borrarUno/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.id === 200) {
              MySwal.fire({
                title: <strong>Eliminado</strong>,
                html: <i>Proyecto Eliminado Correctamente</i>,
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
          <h1 className="h3 mb-0 text-gray-800">Proyectos</h1>
          <NavLink
            to="/Dashboard/AgregarProyectos"
            className="btn"
            id="botones"
          >
            <i className="bi bi-plus-square-dotted"></i> Agregar Proyecto
          </NavLink>
        </div>

        <div className="row">
          <div className="col-lg-12 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-center" id="titulos">
                  Mis Proyectos
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
                        <th>Nombre</th>
                        <th>Detalle</th>
                        <th>Link</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proyectos != null ? (
                        proyectos.map((proyecto) => {
                          return (
                            <tr key={proyecto._id}>
                              <td>{proyecto.nombre}</td>
                              <td>{proyecto.detalle}</td>
                              <td>{proyecto.link}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn"
                                  id="botones"
                                  onClick={() => {
                                    setEditar(proyecto._id);
                                    handleShow();
                                  }}
                                >
                                  <i className="bi bi-pencil-square"></i>
                                </button>
                                {Editar === proyecto._id && (
                                  <EditarProyecto
                                    show={show}
                                    handleClose={handleClose}
                                    id={proyecto._id}
                                    nombre={proyecto.nombre}
                                    detalle={proyecto.detalle}
                                    link={proyecto.link}
                                    setEditar={setEditar}
                                  ></EditarProyecto>
                                )}
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => {
                                    eliminarProyecto(
                                      proyecto._id,
                                      proyecto.nombre
                                    );
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
                          No se encontraron proyectos registrados
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

export default Proyectos;
