//controlador del perfil
// instanciamos el objeto Perfil de los modelos

let Estudios = require("../models/Estudios");
let bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registrar = async (req, res) => {
  try {
    let tipo = req.body.tipo;
    let detalle = req.body.detalle;
    let fechaFin = req.body.fechaFin;
    let notas = req.body.notas;
    let persona = req.user.userId;
    //validar los datos

    //crear el objeto
    let crearEstudio = new Estudios({
      tipo: tipo,
      detalle: detalle,
      fechaFin: fechaFin,
      notas: notas,
      Persona: persona,
    });

    crearEstudio.save();

    return res.status(200).send({
      status: "ok",
      titulo: "Felicitaciones",
      mensaje: "Estudio Insertado con exito",
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
    let consulta = await Estudios.find({})
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
    consulta = await Estudios.findOneAndDelete(id).exec();
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

    let consulta = await Estudios.findOneAndUpdate({ _id: id }, data).exec();
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
