import React, { Component, useState } from "react";
import HelperForm from "../../helpers/HelperForm";
import { Global } from "../../helpers/Global";
import UseAuth from "../../helpers/UseAuth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Ingresar = () => {
  const { form, cambiar } = HelperForm({});
  const { setAutenticado } = UseAuth();
  //
  const login = async (e) => {
    e.preventDefault();
    let usuarioLogin = form;
    //guardar en la api
    const request = await fetch(Global.url + "/personales/login", {
      method: "POST",
      body: JSON.stringify(usuarioLogin),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await request.json();
    if (data.resultado == "ok") {
      // console.log(data);
      localStorage.setItem("token", data.user.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setAutenticado(data.user);
      window.location.reload();
    } else {
      if (data.resultado == "errorUser") {
        let titulo = data.titulo;
        let mensaje = data.mensaje;
        MySwal.fire({
          title: <strong> {titulo}</strong>,
          html: <i>{mensaje}</i>,
          icon: "error",
        });
      } else if (data.resultado == "errorPass") {
        let titulo = data.titulo;
        let mensaje = data.mensaje;
        MySwal.fire({
          title: <strong> {titulo}</strong>,
          html: <i>{mensaje}</i>,
          icon: "error",
        });
      } else if (data.resultado == "errorVacio") {
        let titulo = data.titulo;
        let mensaje = data.mensaje;
        MySwal.fire({
          title: <strong> {titulo}</strong>,
          html: <i>{mensaje}</i>,
          icon: "error",
        });
      }
    }
  };

  //render del componente
  return (
    <>
      <div className="container-login100">
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
          <form onSubmit={login} className="login100-form validate-form">
            <span className="login100-form-title p-b-49"> Inicio </span>

            <div
              className="wrap-input100 validate-input m-b-23"
              data-validate="Email is reauired"
            >
              <span className="label-input100">Email</span>
              <input
                className="input100"
                type="text"
                name="email"
                placeholder="Escribe tu email"
                onChange={cambiar}
              />
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <span className="label-input100">Password</span>
              <input
                className="input100"
                type="password"
                name="password"
                placeholder="Escribe tu contraseña"
                onChange={cambiar}
              />
              <span className="focus-input100" data-symbol="&#xf190;"></span>
            </div>

            <div className="container-login100-form-btn mt-3">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button type="submit" className="login100-form-btn">
                  Inicio
                </button>
              </div>
            </div>

            <div className="txt1 text-center p-t-54 p-b-20">
              <span> Aún no esta registrado? </span>
              <a href="./Registro">Registrate</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Ingresar;
