const Router = require("express").Router();

const citiesControllers = require("../controllers/citiescontrollers");
const {getCities, getOneCity, addCity, updateCity, removeCity} = citiesControllers
const itinerariesControllers = require("../controllers/itinerariesControllers");
const { signUpUsers, signInUser, verifyMail, verifyToken,  } = require("../controllers/userControllers");
const {getItineraries, getOneItinerary, addItinerary, updateItinerary, removeItinerary, findTinFromCity, like} = itinerariesControllers
const validator = require("../config/validator")
const passport = require("../config/passport")
const activitiesControllers = require("../controllers/activitiesControllers");
const { getActivities, getOneActivity, addActivity, updateActivity, removeActivity, findActbyTin } = activitiesControllers
const commentsControllers = require("../controllers/commentControllers");
const { addComment, modifyComment, deleteComment } = commentsControllers


// Cities
Router.route("/cities")
.get(getCities)
.post(addCity)

Router.route("/cities/:id")
.delete(removeCity)
.put(updateCity)
.get(getOneCity)

// Itineraries
Router.route("/itineraries")
.get(getItineraries)
.post(addItinerary)

Router.route("/itineraries/:id")
.delete(removeItinerary)
.put(updateItinerary)
.get(getOneItinerary)

Router.route("/itineraries/cities/:id")
.get(findTinFromCity)

Router.route("/itineraries/likes/:id")
.put(passport.authenticate("jwt", {session: false}),like)

// Sign up, sign in, verificaciones y passport
Router.route("/auth/signUp")
.post(validator, signUpUsers)

Router.route("/auth/signIn")
.post(signInUser)

Router.route("/verify/:string")
.get(verifyMail)

Router.route("/auth/signInToken")
.get(passport.authenticate('jwt',{session:false}),verifyToken)
// Activities

Router.route("/activities")
.get(getActivities)
.post(addActivity)

Router.route("/activities/:id")
.delete(removeActivity)
.put(updateActivity)
.get(getOneActivity)

Router.route("/activities/itineraries/:id")
.get(findActbyTin)

Router.route('/comments')
.put(passport.authenticate('jwt', { session: false }), modifyComment)
.post(passport.authenticate('jwt', { session: false }), addComment)

Router.route('/comments/:id')
.post(passport.authenticate('jwt', { session: false }), deleteComment)


module.exports = Router