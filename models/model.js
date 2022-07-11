const mongoose = require("mongoose")

const citiesSchema = new mongoose.Schema({
    cityname:{type:String, required:true},
    country:{type:String, required:true},
    photo:{type:String, required:true}
})
const Cities = mongoose.model("cities", citiesSchema)
module.exports = Cities 