import React from "react";
import { useState, useEffect, createContext } from "react";
import { Global } from "../helpers/Global";

/**
 * Service provider para validar credenciales del localstorage vs credenciales
 * Crea un objeto o varianble de contexto para usar en toda la aplicación
 * Genera un estado = Autenticado
 * retorna el authcontext.provider => proveedor de servicio de autenticación
 */

//Crea el contexto(supervariable, variable de session como las de php $_SESSION)
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //Se crea el useState para validar
  const [Autenticado, setAutenticado] = useState({});
  useEffect(() => {
    autenticarUsuario();
  }, []);

  /**
   * Compara que el token sea valido
   * @returns objeto serializado de la comparacion de localstorage vs api
   */
  const autenticarUsuario = async () => {
    //obtener datos del usuario logueado
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    // validamos que los datos existan en el localstorage
    if (!token || !user) {
      return false;
    }
    // si existen los transformamos en objeto javascript para manipular el ID del usuario
    const userObj = JSON.parse(user);
    const id = userObj.id;
    // Comprobacion del token del localstorage vs el del Backend

    const request = await fetch(Global.url + "personales/listarUno/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await request.json();

    setAutenticado(data.user);
  };

  //=======================================================================================================
  return (
    <AuthContext.Provider value={{ Autenticado, setAutenticado }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
