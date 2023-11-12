import React, { Component, useState } from "react";
import { NavLink } from "react-router-dom";

const AsideD = () => {
  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/Dashboard"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">Portafolio</div>
        </a>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item">
          <NavLink to="/Dashboard" className="nav-link">
            <i className="fas fa-fw fa-table"></i>
            <span>Inicio</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="Proyectos" className="nav-link">
            <i className="fas fa-fw fa-table"></i>
            <span>Proyectos</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="Estudios" className="nav-link">
            <i className="fas fa-fw fa-table"></i>
            <span>Estudios</span>
          </NavLink>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />
      </ul>
    </>
  );
};

export default AsideD;
