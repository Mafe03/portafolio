//controlador del perfil
// instanciamos el objeto Perfil de los modelos

let Proyectos = require("../models/Proyectos");
let bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registrar = async (req, res) => {
  try {
    let datos = req.body;
    //validar los datos

    //crear el objeto
    const proyectosGuardar = new Proyectos(datos);

    proyectosGuardar.save();
    return res.status(200).send({
      status: "ok",
      mensaje: "Insertado con exito",
    });
  } catch (error) {
    return res.status(404).send({
      nombreError: error.name,
      Mensaje: "Error en la consulta : " + error.message,
    });
  }
};

const listar = async (req, res) => {
  try {
    let limite = req.params.limite;
    let consulta = await Proyectos.find({})
      .sort({ _id: -1 })
      .limit(limite)
      .exec();
    return res.status(200).send({
      longitud_resultado: consulta.length,
      resultado: consulta,
    });
  } catch (error) {
    return res.status(404).send({
      nombreError: error.name,
      Mensaje: "Error en la consulta : " + error.message,
    });
  }
};

const borrarUno = async (req, res) => {
  try {
    //obtener el id
    let id = req.params.id;
    consulta = await Proyectos.findOneAndDelete(id).exec();
    return res.status(200).send({
      resultado: "success",
    });
  } catch (error) {
    return res.status(404).send({
      nombreError: error.name,
      Mensaje: "Error en la consulta : " + error.message,
    });
  }
};

const editar = async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;

    let consulta = await Proyectos.findOneAndUpdate({ _id: id }, data).exec();
    return res.status(200).send({
      resultado: "success",
      consulta,
    });
  } catch (error) {
    return res.status(404).send({
      nombreError: error.name,
      Mensaje: "Error en la actualizacion : " + error.message,
    });
  }
};

module.exports = {
  registrar,
  listar,
  borrarUno,
  editar,
};