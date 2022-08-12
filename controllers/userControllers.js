const User = require("../models/modelUser.js")
const bcryptjs = require("bcryptjs")
const crypto = require("crypto")
const sendEmail = require("./sendEmail")
const jwt = require("jsonwebtoken")
 
const userControllers = {
    signUpUsers: async (req, res) => {
        let {fullname, email, password, country, photo, from} = req.body.userData
        // console.log(req.body.userData)
        // const test = req.body.test
        try {
            const userExists = await User.findOne({ email })
            const verification = false
            const uniqueString = crypto.randomBytes(15).toString("hex")
            if (userExists){
                if (userExists.from.indexOf(from) !== -1) {
                res.json({
                    success: false,
                    from: "form-Signup",
                    message: "You have done your sign up in this way, please sign in"
                })
                } else {
                    const hashedpass = bcryptjs.hashSync(password, 10)
                    userExists.from.push(from)
                    userExists.password.push(hashedpass)
                    userExists.verification = true
                    await userExists.save()
                    res.json({
                        success: true, 
                        from: "form-Signup",
                        message: "We added " + from + "to your medias to sign in"
                    })
                }
            } else {
                const hashedpass = bcryptjs.hashSync(password, 10)
                const newUser = await new User({
                    fullname,
                    email,
                    password: [hashedpass],
                    country,
                    photo,
                    uniqueString: uniqueString,
                    verification: verification,
                    from: [from],
                })
                if (from !== "form-Signup") {
                    newUser.verification=true
                    await newUser.save()
                    res.json({
                        success: true,
                        from: [from],
                        message: "Congratulations! Your user has been created with " + from
                    })
                } else {
                    await newUser.save()
                    await sendEmail(email, uniqueString)
                    res.json({
                        success: true,
                        from: "signup",
                        message: "We sent you a validation email, please verify your email!"
                    })
                }
            }
        } catch (error) {
            res.json({success: false, message: "Something went wrong, try again in few minutes"})
        }
    },
    signInUser: async (req, res) => {
        const {email, password, from} = req.body.logedUser
        try{
            const userExists = await User.findOne({email})
            // console.log(userExists);
            // const indexpass = userExists.from.indexOf(from)
            if(!userExists){
                res.json({success: false, message: "Your user has not signed up"})
            } else {
                if (from !== "form-Signin" /* || userExists.verification */ ) {
                    let passmatch = userExists.password.filter(pass => bcryptjs.compareSync(password, pass))
                    // console.log(passmatch)
                    if (passmatch.length > 0) {
                        const userData = {
                            id: userExists._id,
                            fullname: userExists.fullname,
                            email: userExists.email,
                            photo: userExists.photo,
                            from: from,
                        }
                        await userExists.save()
                        const token = jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn: 60* 60*24*7})
                        // console.log(token);
                        if (userExists.verification){
                        res.json({
                            success: true,
                            from: from,
                            response: { token, userData },
                            message: "Welcome again" + userData.fullname,
                        })
                    } else{
                        res.json({
                            success: true,
                            from: from,
                            response: { token, userData },
                            message: "Welcome again" + userData.fullname + ", remember to confirm your account"
                        })
                    }
                    } else {
                        res.json({
                            success: false, 
                            from: from,
                            message: "You didn´t signed up with " + from + ", if you want sign in with this method you have to sign up with " + from 
                        })
                    }
                } else {
                    let passmatch = userExists.password.filter(pass => bcryptjs.compareSync(password, pass))
                    // console.log(passmatch);
                    if (passmatch.length > 0) {
                            // console.log("jopa");
                            const userData = {
                            id: userExists._id,
                            fullname: userExists.fullname,
                            email: userExists.email,
                            photo: userExists.photo,
                            from: from,
                        }
                        await userExists.save()
                        const token = jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn: 60* 60*24*7})
                        // console.log(token);
                        res.json({
                            success: true,
                            from: from,
                            response: { token, userData },
                            message: "Welcome again" + userData.fullname, 
                        })
                    } else {
                        res.json({
                            success: false,
                            from: from,
                            message: "User or pass doesn´t match"
                        })
                    }
                    
                }
            }
        } catch (error){
            res.json({success: false, message: "Something went wrong, try again in few minutes"})
        }
    },verifyMail: async (req, res) => {
        const { string } = req.params
        const user = await User.findOne({ uniqueString: string })
        // console.log(user)
        if (user) {
            user.verification = true
            await user.save()
            res.redirect("http://localhost:3000/")
        }
        else {
            res.json({
                success: false,
                message: "This email has not account yet!"
            })
        }
    },verifyToken: (req,res) => {
        // console.log("lol");
        if(req.user){
            // console.log(req.user);
            res.json({success:true,
                        response:{id:req.user.id, fullname: req.user.fullname, email: req.user.email,from: "token", photo: req.user.photo},
                        message: "Welcome again "+req.user.fullname})
        }else{
            res.json({success:false,
                        message: "Please sign in again"})
        }
    }
}
module.exports = userControllers