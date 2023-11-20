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

const listar = async (req, res) => {
  try {
    let pagina;
    if (req.params.pagina) {
      pagina = req.params.pagina;
    }
    pagina = parseInt(pagina);
    let itemsPerPage = 5;
    const options = {
      page: pagina,
      limit: itemsPerPage,
      sort: { _id: 1 },
    };
    Proyectos.paginate({}, options)
      .then((result) => {
        if (!result) {
          return res.status(400).send({
            id: 400,
            Encabezado: "Error",
            mensaje: "No hay registros",
          });
        } else {
          return res.status(200).send({
            id: 200,
            Encabezado: "Felicitaciones",
            mensaje: "Lista de Proyectos",
            perfiles: result.docs,
            pagina,
            limite: result.limit,
            totalPaginas: result.totalPages,
            registros: result.totalDocs,
          });
        }
      })
      .catch((error) => {
        return res.status(400).send({
          id: 400,
          Encabezado: "Error",
          mensaje: "Error al Generar: " + error,
        });
      });
  } catch (error) {
    return res.status(400).send({
      id: 400,
      Encabezado: "Error",
      mensaje: "Error de Consulta: " + error.messages,
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
