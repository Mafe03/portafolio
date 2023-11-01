//orm de perfil
const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Proyectos = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    detalle: {
      type: String,
      required: true,
      default: "",
    },
    link: {
      type: String,
      required: true,
    },
    Persona: {
      type: Schema.ObjectId,
      ref: "Personales",
    },
  },
  { collection: "proyectos" }
);
Proyectos.plugin(mongoosePaginate);
module.exports = model("Proyectos", Proyectos, "proyectos");
