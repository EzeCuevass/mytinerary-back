const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fullname: {type:String, required:true},
    email: {type:String, required:true},
    password: [{type:String, required:true}],
    country: {type:String, required: true},
    photo: {type:String, required: true},
    from: {type:Array, required: true}, 
    uniqueString: {type:String, required:true},
    verification: {type:Boolean, required:true},
})
const User = mongoose.model("users", userSchema)
module.exports = User