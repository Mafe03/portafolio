// router de perfil
const express = require("express");
const router = express.Router();
const multer = require("multer");
const proyectosControlador = require("../controllers/proyectos");
const auth = require("../controllers/auth");

//configuracion de subidad de archivos

router.post("/proyectos/registrar", auth, proyectosControlador.registrar);
router.get("/proyectos/listar/:limite?", auth, proyectosControlador.listar);
router.delete("/proyectos/borrarUno/:id", auth, proyectosControlador.borrarUno);
router.put("/proyectos/editar/:id", auth, proyectosControlador.editar);
module.exports = router;
