const mongoose = require("mongoose")


const schema = mongoose.Schema({
    URL: String,
    altitud: Number,
    longitud: Number,
    latitud: Number
})

module.exports = mongoose.model("User", schema)