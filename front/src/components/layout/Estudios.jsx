import React, { Component, useState } from "react";
import { NavLink } from "react-router-dom";

const Estudios = () => {
  return (
    <>
      <div id="wrapper">
        <ul
          className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          <a
            className="sidebar-brand d-flex align-items-center justify-content-center"
            href="index.html"
          >
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink"></i>
            </div>
            <div className="sidebar-brand-text mx-3">Portafolio</div>
          </a>

          <hr className="sidebar-divider my-0" />

          <li className="nav-item">
            <NavLink to="/Inicio" className="nav-link">
              <i className="fas fa-fw fa-table"></i>
              <span>Inicio</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/Proyectos" className="nav-link">
              <i className="fas fa-fw fa-table"></i>
              <span>Proyectos</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/Estudios" className="nav-link">
              <i className="fas fa-fw fa-table"></i>
              <span>Estudios</span>
            </NavLink>
          </li>

          <hr className="sidebar-divider d-none d-md-block" />
        </ul>

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              <ul className="navbar-nav ml-auto">
                <div className="topbar-divider d-none d-sm-block"></div>

                <li className="nav-item dropdown no-arrow">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                      Usuario
                    </span>
                    <img
                      className="img-profile rounded-circle"
                      src="img/undraw_profile.svg"
                    />
                  </a>
                </li>
              </ul>
            </nav>

            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Estudios</h1>
                <button className="btn btn-primary">Agregar Estudio</button>
              </div>

              <div className="row">
                <div className="col-lg-12 mb-4">
                  <div class="card shadow mb-4">
                    <div class="card-header py-3">
                      <h6 class="m-0 font-weight-bold text-primary text-center">
                        Mis Estudios
                      </h6>
                    </div>
                    <div class="card-body">
                      <div class="table-responsive ">
                        <table
                          class="table table-bordered"
                          id="dataTable"
                          width="100%"
                          cellspacing="0"
                        >
                          <thead>
                            <tr>
                              <th>Tipo</th>
                              <th>Detalles</th>
                              <th>Fecha de Fin</th>
                              <th>Nota</th>
                              <th>Editar</th>
                              <th>Eliminar</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Tiger Nixon</td>
                              <td>System Architect</td>
                              <td>Edinburgh</td>
                              <td>Edinburgh</td>
                              <td>
                                <button className="btn btn-primary">
                                  <i class="fa fa-pencil-square-o"></i>
                                </button>
                              </td>
                              <td>
                                <button className="btn btn-danger">
                                  <i class="fas fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 mb-4"></div>
              </div>
            </div>
          </div>

          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright &copy; Your Website 2021</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Estudios;
