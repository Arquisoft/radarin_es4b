const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true)

// Esquema para las localizaciones de los usuarios
const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

// Esquema para los usuarios con sus localizaciones
const schema = mongoose.Schema({
    URL: String,
    location: {
      type: pointSchema,
      index: '2dsphere'
    },
    altitud: Number,
    longitud: Number,
    latitud: Number,
    fecha: Date,
    banned: Boolean,
});

module.exports = mongoose.model("User", schema);