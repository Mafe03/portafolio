import React, { Component, useState } from "react";
import HelperForm from "../../helpers/HelperForm";
import { Global } from "../../helpers/Global";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Registrarse = () => {
  const { form, cambiar } = HelperForm({});

  const guardarPersona = async (e) => {
    e.preventDefault();
    let nuevoPersona = form;
    //guardar en la api
    const request = await fetch(Global.url + "/personales/registrar", {
      method: "POST",
      body: JSON.stringify(nuevoPersona),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await request.json();

    if (data.status == "ok") {
      let titulo = data.titulo;
      let mensaje = data.mensaje;
      MySwal.fire({
        title: <strong> {titulo}</strong>,
        html: <i>{mensaje}</i>,
        icon: "success",
      });
    } else {
      let titulo = data.Encabezado;
      let mensaje = data.mensaje;
      MySwal.fire({
        title: <strong> {titulo}</strong>,
        html: <i>{mensaje}</i>,
        icon: "error",
      });
      // console.log(data);
    }
  };

  return (
    <>
      <div className="container-login100">
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
          <form
            className="login100-form validate-form"
            onSubmit={guardarPersona}
          >
            <span className="login100-form-title p-b-49"> Login </span>
            <div
              className="wrap-input100 validate-input m-b-23"
              data-validate="Name is required"
            >
              <span className="label-input100">Nombre</span>
              <input
                className="input100"
                type="text"
                name="nombre"
                onChange={cambiar}
              />
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>
            <div
              className="wrap-input100 validate-input m-b-23"
              data-validate="LastName is required"
            >
              <span className="label-input100">Apellidos</span>
              <input
                className="input100"
                type="text"
                name="apellidos"
                onChange={cambiar}
              />
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>
            <div
              className="wrap-input100 validate-input m-b-23"
              data-validate="Birthdate is required"
            >
              <span className="label-input100">Fecha de Nacimiento</span>
              <input
                className="input100"
                type="date"
                name="fechaNace"
                onChange={cambiar}
              />
              <span className="focus-input100"></span>
            </div>
            <div
              className="wrap-input100 validate-input m-b-23"
              data-validate="Email is reauired"
            >
              <span className="label-input100">Email</span>
              <input
                className="input100"
                type="text"
                name="email"
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
                onChange={cambiar}
              />
              <span className="focus-input100" data-symbol="&#xf190;"></span>
            </div>
            <div
              className="wrap-input100 validate-input m-b-23"
              data-validate="Address is reauired"
            >
              <span className="label-input100">Dirección</span>
              <input
                className="input100"
                type="text"
                name="direccion"
                onChange={cambiar}
              />
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>

            <div
              className="wrap-input100 validate-input m-b-23"
              data-validate="Number phone is reauired"
            >
              <span className="label-input100">Telefono</span>
              <input
                className="input100"
                type="text"
                name="telefono"
                onChange={cambiar}
              />
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>

            <div className="container-login100-form-btn mt-3">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button type="submit" className="login100-form-btn">
                  Registrarse
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registrarse;
