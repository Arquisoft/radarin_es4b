const mongoose = require("mongoose")


const schema = mongoose.Schema({
    URL: String,
    altitud: mongoose.Types.Decimal128,
    longitud: mongoose.Types.Decimal128,
    latitud: mongoose.Types.Decimal128
})

module.exports = mongoose.model("User", schema)