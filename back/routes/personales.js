// router de perfil
const express = require("express");
const router = express.Router();
const multer = require("multer");
const personalesControlador = require("../controllers/personales");
const auth = require("../controllers/auth");

//configuracion de subidad de archivos

router.post("/personales/registrar", personalesControlador.registrar);
router.get("/personales/listar/:limite?", auth, personalesControlador.listar);
router.get("/personales/listarUno/:id", auth, personalesControlador.listarUno);
router.delete(
  "/personales/borrarUno/:id",
  auth,
  personalesControlador.borrarUno
);
router.put("/personales/editar/:id", auth, personalesControlador.editar);
router.post("/personales/login", personalesControlador.login);
module.exports = router;
