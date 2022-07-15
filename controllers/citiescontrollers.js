const Cities = require("../models/model")
 
const citiesControllers = {
    getCities: async (req, res)=>{
        let cities 
        let error = null
        try {
            cities = await Cities.find()
        } catch (err){
            error = err
        }
        res.json({
            response: error ? "Error" : {cities},
            success: error ? false : true,
            error: error
        })
    },
    getOneCity: async (req, res)=>{
        let id = req.params.id
        let city
        let error = null
        try{
            city = await Cities.findOne({_id:id})
        }catch (err){
            error = err
        }
        res.json({
            response: error ? "Error" : {city},
            success: error ? false : true,
            error: error
        })
    },
    addCity: async (req, res)=>{
        const {cityname,country,photo} = req.body
        let city 
        let error = null
        try{
            city = await new Cities({
                cityname: cityname,
                country: country,
                photo: photo
            }).save()
        } catch (err){
            error = err
        }
        res.json({
            response: error ? "Error" : city,
            success: error ? false : true,
            error: error
        })
    },
    updateCity: async (req, res)=>{
        const id = req.params.id
        const city = req.body
        let citydb
        let error = null
        try{
            citydb = await Cities.findOneAndUpdate({_id:id}, city, {new:true})
        }catch (err){error=err}
        res.json({
            response: error ? "Error" : citydb,
            success: error ? false : true,
            error: error
        })
    },
    removeCity: async (req, res)=>{
        const id = req.params.id
        let city
        let error = null
        try{
            city = await Cities.findByIdAndDelete({_id:id})
        }catch(err){error=err}
        res.json({
            response: error ? "Error" : city,
            success: error ? false : true,
            error: error
        })
    }
}
module.exports = citiesControllers