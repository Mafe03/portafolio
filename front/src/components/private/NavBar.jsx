import React, { Component, useState } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <ul className="navbar-nav ml-auto">
          <div className="topbar-divider d-none d-sm-block"></div>

          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle "
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small ">
                Cerrar sesión
              </span>
              <i class="bi bi-box-arrow-right"></i>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
