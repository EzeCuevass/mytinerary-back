const Itineraries = require("../models/modelitineraries");
 
const itinerariesControllers = {
    getItineraries: async (req, res)=>{
        let itineraries 
        let error = null
        try {
            itineraries = await Itineraries.find()
            .populate("cities")
        } catch (err){
            error = err
        }
        res.json({
            response: error ? "Error" : {itineraries},
            success: error ? false : true,
            error: error
        })
    },
    getOneItinerary: async (req, res)=>{
        let id = req.params.id
        let itinerary
        let error = null
        try{
            itinerary = await Itineraries.findOne({_id:id})
        }catch (err){
            error = err
        }
        res.json({
            response: error ? "Error" : {itinerary},
            success: error ? false : true,
            error: error
        })
    },
    addItinerary: async (req, res)=>{
        const {itineraryName,person,personPhoto,price,duration,hashtags,likes, cities} = req.body
        let itinerary 
        let error = null
        try{
            itinerary = await new Itineraries({
                itineraryName: itineraryName,
                person: person,
                personPhoto: personPhoto,
                price: price,
                duration: duration,
                hashtags: hashtags,
                likes: likes,
                cities: cities
            }).save()
        } catch (err){
            error = err
        }
        res.json({
            response: error ? "Error" : itinerary,
            success: error ? false : true,
            error: error
        })
    },
    updateItinerary: async (req, res)=>{
        const id = req.params.id
        const itinerary = req.body
        let itinerarydb
        let error = null
        try{
            itinerarydb = await Itineraries.findOneAndUpdate({_id:id}, itinerary, {new:true})
        }catch (err){error=err}
        res.json({
            response: error ? "Error" : itinerarydb,
            success: error ? false : true,
            error: error
        })
    },
    removeItinerary: async (req, res)=>{
        const id = req.params.id
        let itinerary
        let error = null
        try{
            itinerary = await Itineraries.findByIdAndDelete({_id:id})
        }catch(err){error=err}
        res.json({
            response: error ? "Error" : itinerary,
            success: error ? false : true,
            error: error
        }) 
    },
    findTinFromCity: async (req,res) => {
        let cityid = req.params.id
        let itineraries
        let error = null
        try{
            itineraries = await Itineraries.find({ cities:cityid })
            .populate("cities")
            .populate("activities")
        }catch (err) { error = err } 
        res.json({
            response : error ? 'ERROR' : { itineraries },
            success: error ? false : true,
            error: error
        })
    },
    like: async (req, res) => {
        let id = req.params.id
        let user = req.user.id
        await Itineraries.findOne({_id:id})
        .then( (itinerary) => {
            if (itinerary.likes.includes(user)) {
                Itineraries.findOneAndUpdate({_id:id}, {$pull:{likes:user}}, {new:true})
                .then(response => res.json({
                    response: response.likes,
                    success: true
                }))
                .catch(error => console.log(error))
            } else {
                Itineraries.findOneAndUpdate({_id:id}, {$push:{likes:user}}, {new:true})
                .then(response => res.json({
                    response: response.likes,
                    succes: true
                }))
                .catch(error => console.log(error))
            } 
        }).catch ((error) =>
            res.json({
                response: error,
                success: false
            })
        )
    },
    
}
module.exports = itinerariesControllers