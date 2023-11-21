import React, { Component, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UseAuth from "../../helpers/UseAuth";
import HelperForm from "../../helpers/HelperForm";
import { Global } from "../../helpers/Global";
import EditarProyecto from "./EditarProyecto";
import Swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal2);

const Proyectos = () => {
  const { Autenticado } = UseAuth();
  const token = localStorage.getItem("token");
  useEffect(() => {
    listarProyectos();
  }, []);

  const eliminarProyecto = (id, nombre) => {
    MySwal.fire({
      title: `¿ Quieres eliminar el proyecto de ${nombre} ?`,
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fetch(Global.url + `proyectos/borrarUno/${id}`, {
          method: "DELETE", // Método de solicitud (puede ser GET, POST, etc.)
          headers: {
            Authorization: `${token}`, // Incluye el token JWT en el encabezado Authorization
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.id == 200) {
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

  const [proyectos, setProyectos] = useState(null);
  const [Editar, setEditar] = useState(0);
  const [page, setPage] = useState(1);
  const [totalp, setTotalp] = useState(null);

  const listarProyectos = async (nextpages = 1) => {
    const obtenerProyectos = await fetch(
      Global.url + "proyectos/listar/" + nextpages,
      {
        method: "GET", // Método de solicitud (puede ser GET, POST, etc.)
        headers: {
          Authorization: `${token}`, // Incluye el token JWT en el encabezado Authorization
        },
      }
    );
    const proyectos2 = await obtenerProyectos.json();
    setTotalp(proyectos2.totalPaginas);
    if (proyectos2.perfiles.length == 0) {
      setProyectos(null);
    } else {
      setProyectos(proyectos2.perfiles);
    }
  };

  const NextPage = () => {
    if (page >= totalp) {
      MySwal.fire({
        icon: "error",
        title: "Oppss..",
        text: "No hay mas informacion\npara mostrar",
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
        title: "Oppss..",
        text: "Ya estas en la Primera Pagina",
      });
    } else {
      let next = page - 1;
      setPage(next);
      listarProyectos(next);
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                                  className="btn btn-info"
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
                                  <i class="bi bi-trash-fill"></i>
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
                          NO HAY PROYECTOS DISPONIBLES
                        </h1>
                      )}
                    </tbody>
                  </table>
                  <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                      <li class="page-item">
                        <button
                          id="anterior"
                          onClick={AntPage}
                          class="page-link"
                        >
                          Anterior
                        </button>
                      </li>
                      <li class="page-item">
                        <button
                          id="siguiente"
                          onClick={NextPage}
                          class="page-link"
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
