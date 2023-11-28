import React, { Component, useState } from "react";
import { NavLink } from "react-router-dom";
import logo3 from "../../assets/img/logoPorta.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { faUserGraduate } from "@fortawesome/free-solid-svg-icons";

const AsideD = () => {
  const datos = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <ul
        className="navbar-nav sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/Dashboard"
        >
          <div className="sidebar-brand-icon ">
            <img src={logo3} alt="Logo" style={{ width: 65 }} />
          </div>
          <div className="sidebar-brand-text mx-3">Portafolio</div>
        </a>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item">
          <NavLink to="/Dashboard" className="nav-link">
            <FontAwesomeIcon className="fa-fw" icon={faHouse} />
            {"   "}
            <span>Inicio</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="Proyectos" className="nav-link">
            <FontAwesomeIcon className="fa-fw" icon={faBook} />
            {"   "}
            <span>Proyectos</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="Estudios" className="nav-link">
            <FontAwesomeIcon className="fa-fw" icon={faGraduationCap} />
            {"   "}
            <span>Estudios</span>
          </NavLink>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />
        <div className="sidebar-footer">
          <li className="nav-item">
            <div className="nav-link">
              <FontAwesomeIcon className="fa-fw" icon={faUserGraduate} />
              {"   "}
              <span>
                {datos.nombre} {datos.apellidos}
              </span>
            </div>
          </li>
        </div>
      </ul>
    </>
  );
};

export default AsideD;
