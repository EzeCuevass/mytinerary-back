const mongoose = require("mongoose")

const activitiesschema = new mongoose.Schema({
    activity:{type:String, required:true},
    activityphoto:{type:String, required:true},
    itineraries:{type: mongoose.Types.ObjectId, ref:"itineraries"}
})
const Activities = mongoose.model("activities", activitiesschema)
module.exports = Activities 