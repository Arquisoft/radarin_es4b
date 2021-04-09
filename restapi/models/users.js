const mongoose = require("mongoose")

const schema = mongoose.Schema({
    URL: String,
    location: {
        type: {
          type: String,
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    altitud: Number,
    longitud: Number,
    latitud: Number,
    fecha: Date
})

// Crea un índice para las consultas por cercanía
schema.index({ location: '2dsphere' });

module.exports = mongoose.model("User", schema)