// router de perfil
const express = require("express");
const router = express.Router();
const multer = require("multer");
const estudiosControlador = require("../controllers/estudios");
const auth = require("../controllers/auth");

//configuracion de subidad de archivos

router.post("/estudios/registrar", auth, estudiosControlador.registrar);
router.get("/estudios/listar/:limite?", auth, estudiosControlador.listar);
router.delete("/estudios/borrarUno/:id", auth, estudiosControlador.borrarUno);
router.put("/estudios/editar/:id", auth, estudiosControlador.editar);
module.exports = router;
