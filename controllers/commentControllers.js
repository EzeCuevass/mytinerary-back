const Itineraries = require('../models/modelitineraries')
 
const commentsControllers = {
    addComment: async (req, res) => {
        const {itineraryId} = req.body.comment
        const comment = req.body.comment.comments.comment
        const user = req.user 
        // console.log(req.body); 
        console.log(req.body) 
        try {
        const newComment = await Itineraries.findOneAndUpdate({ _id: itineraryId }, 
            { $push: { comments: { comment: comment, iduser: user, date: Date.now() } } }, { new: true })
            .populate("comments.iduser")
        res.json({ success: true, response: { newComment }, message: "Thanks for your comment" })
        }
        catch (error) {
        console.log(error) 
        res.json({ success: false, message: "Something went wrong, please try in a few seconds" })
        } 
    },
    modifyComment: async (req, res) => {
        const {commentId,comment} = req.body.comment
        try {
            const newComment = await Itineraries.findOneAndUpdate({"comments._id":commentId}, 
            {$set: {"comments.$.comment": comment,"comments.$.date": Date.now() }}, {new: true})
            .populate("comments.iduser")
            console.log(newComment)
            res.json({ success: true, response:{newComment}, message:"Your commentary has been changed" })
        }
        catch (error) {
            console.log(error)
            res.json({ success: true, message: "Something went wrong, please try in a few seconds" })
        }
    },
    deleteComment: async (req, res) => {
        const id = req.params.id
        try {
            const deleteComment = await Itineraries.findOneAndUpdate({"comments._id":id}, {$pull: {comments: {_id: id}}}, {new: true})
            res.json({ success: true, response:{deleteComment}, message: "Message deleted" })
        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "Something went wrong, please try in a few seconds" })
        }
    },
}
module.exports = commentsControllers