const mongoose = require("mongoose")


const schema = mongoose.Schema({
    URL: String,
    altitud: Number,
    longitud: Number,
    latitud: Number,
    fecha: Date
})

module.exports = mongoose.model("User", schema)