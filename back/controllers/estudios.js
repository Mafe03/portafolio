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

//listar todos los estudios de los que sigo
const listar = (req, res) => {
  //pagina actual
  let page;
  if (req.params.page) {
    page = req.params.page;
  }
  page = parseInt(page);
  let itemsPerPage = 5;
  // necesario para el funcionamiento del moongoose paginate v2
  const options = {
    page,
    limit: itemsPerPage,
    sort: { _id: 1 },
  };

  Estudios.paginate({}, options)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          status: "error",
          mensaje: "No hay Registros para mostrar!",
        });
      }

      // devuelve el resultado
      return res.status(200).send({
        status: "ok",
        mensaje: "Ejecución exitosa !",
        estudios: result.docs,
        page,
        limite: result.limit,
        totalPaginas: result.totalPages,
        totalRegistros: result.totalDocs,
      });
    })
    .catch((error) => {
      return res.status(500).send({
        status: "error",
        mensaje: "error al generar el listado",
        error,
      });
    });
};

const borrarUno = async (req, res) => {
  try {
    //obtener el id
    let id = req.params.id;
    consulta = await Estudios.findOneAndDelete(id).exec();
    return res.status(200).send({
      id: 200,
      Encabezado: "Correcto",
      mensaje: "Estudio eliminado Correctamente",
    });
  } catch (error) {
    return res.status(404).send({
      id: 400,
      Encabezado: "Error",
      mensaje: "Error de Consulta: " + error.messages,
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
      titulo: "Felicitaciones",
      mensaje: "Estudio editado correctamente",
      consulta,
    });
  } catch (error) {
    return res.status(404).send({
      nombreError: error.name,
      MensajeError: "Error en la edición: " + error.message,
    });
  }
};

module.exports = {
  registrar,
  listar,
  borrarUno,
  editar,
};
