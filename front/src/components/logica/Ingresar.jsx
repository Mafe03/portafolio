import React, { Component, useState } from "react";
import HelperForm from "../../helpers/HelperForm";
import { Global } from "../../helpers/Global";

const Ingresar = () => {
  const { form, cambiar } = HelperForm({});
  const [guardado, setGuardado] = useState("no_enviado");
  //
  const login = async (e) => {
    e.preventDefault();
    let usuarioLogin = form;
    //guardar en la api
    const request = await fetch(Global.url + "personales/login", {
      method: "POST",
      body: JSON.stringify(usuarioLogin),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await request.json();
    console.log(data);
    if (data.status == "ok") {
      // console.log(data);
      localStorage.setItem("token", data.user.token);
      localStorage.setItem(
        "usuario",
        JSON.stringify(data.user.email, data.user.id)
      );
      setGuardado("Guardado");
    } else {
      //  console.log(data);
      setGuardado("Error");
    }
  };

  //render del componente
  return (
    <>
      <div className="container-login100">
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
          <form className="login100-form validate-form">
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
                placeholder="Type your Email"
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
                name="pass"
                placeholder="Type your password"
              />
              <span className="focus-input100" data-symbol="&#xf190;"></span>
            </div>

            <div className="container-login100-form-btn mt-3">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button className="login100-form-btn">Inicio</button>
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
