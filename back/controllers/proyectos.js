//controlador del perfil
// instanciamos el objeto Perfil de los modelos

let Proyectos = require("../models/Proyectos");
let bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registrar = async (req, res) => {
  try {
    let persona = req.user.userId;
    let nombre = req.body.nombre;
    let detalle = req.body.detalle;
    let link = req.body.link;
    //validar los datos

    //crear el objeto
    let crearProyecto = new Proyectos({
      nombre: nombre,
      detalle: detalle,
      link: link,
      Persona: persona,
    });

    crearProyecto.save();
    return res.status(200).send({
      status: "ok",
      titulo: "Felicitaciones",
      mensaje: "Proyecto insertado con exito",
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

  Proyectos.paginate({}, options)
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
        proyectos: result.docs,
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
    consulta = await Proyectos.findOneAndDelete({ _id: id }).exec();
    return res.status(200).send({
      id: 200,
      Encabezado: "Correcto",
      mensaje: "Eliminado Correctamente",
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

    let consulta = await Proyectos.findOneAndUpdate({ _id: id }, data).exec();
    return res.status(200).send({
      resultado: "success",
      titulo: "Felicitaciones",
      mensaje: "Proyecto editado correctamente",
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
