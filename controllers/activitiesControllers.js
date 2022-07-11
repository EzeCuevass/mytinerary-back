const Activities = require("../models/modelActivities")

const activitiesControllers = {
    getActivities: async (req, res)=>{
        let activities
        let error = null
        try {
            activities = await Activities.find()
            .populate("itineraries")
        }catch(err){
            error=err
        }
        res.json({
            response: error ? "error" : {activities},
            success: error ? false : true,
            error: error,
        })
    },
    getOneActivity: async (req, res) => {
        let id = req.params.id
        let activity 
        let error = null
        try{
            activity = await Activities.findOne({_id:id})
        }catch(err){
            error=err
        }
        res.json({
            response: error ? "error" : {activity},
            success: error ? false : true,
            error: error,
        })
    },
    addActivity: async (req, res) => {
        const {activity, activityphoto, itineraries} = req.body
        let newactivity 
        let error = null
        try{
            newactivity = await new Activities({
                activity: activity,
                activityphoto: activityphoto,
                itineraries: itineraries
            }).save()        
        }catch(err){
            error=err
        }
        res.json({
            response: error ? "error" : {newactivity},
            success: error ? false : true,
            error: error,
        })
    },
    updateActivity: async (req, res) => {
        const id = req.params.id
        const activity = req.body
        let activitydb 
        let error = null
        try{
            activitydb = await Activities.findByIdAndUpdate({_id:id}, activity, {new:true})
        }catch(err){
            error=err
        }
        res.json({
            response: error ? "error" : {activitydb},
            success: error ? false : true,
            error: error,
        })
    },
    removeActivity: async (req, res) => {
        const id = req.params.id
        let activity
        let error = null
        try{
            activity = await Activities.findByIdAndDelete({_id:id})
        }catch(err){
            error = err
        }
        res.json({
            response: error ? "Error" : {activity},
            success: error ? false : true,
            error: error,
        })
    },
    findActbyTin: async (req, res) => {
        let tinid = req.params.id
        let activities
        let error = null
        try{
            activities = await Activities.find({itineraries:tinid}) 
            .populate("itineraries")
        }catch(err){
            error = err
        }
        res.json({
            response: error ? "error" : {activities},
            success: error ? false : true,
            error: error
        })
    }
}
module.exports = activitiesControllers