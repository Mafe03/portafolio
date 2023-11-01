//orm de perfil
const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Estudios = Schema(
  {
    tipo: {
      type: String,
      required: true,
    },
    detalle: {
      type: String,
      required: true,
      default: "N/A",
    },
    fechaFin: {
      type: Date,
      required: true,
    },
    notas: {
      type: String,
      required: false,
      default: "N/A",
    },
    Persona: {
      type: Schema.ObjectId,
      ref: "Personales",
    },
  },
  { collection: "estudios" }
);
Estudios.plugin(mongoosePaginate);
module.exports = model("Estudios", Estudios, "estudios");
