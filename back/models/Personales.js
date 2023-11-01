//orm de perfil
const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const PersonalesSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    apellidos: {
      type: String,
      required: false,
      default: "",
    },
    fechaNace: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
  },
  { collection: "personales" }
);
PersonalesSchema.plugin(mongoosePaginate);
module.exports = model("Pesonales", PersonalesSchema, "personales");
