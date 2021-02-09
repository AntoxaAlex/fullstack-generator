const express = require("express");
const router = express.Router({mergeParams: true});
const {body, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config()
}

//Login user

//Logout user

//Register user
router.post("/",[
    //name is required
    body("firstname","First name is required").not().isEmpty(),
    //secondname is required
    body("secondname","Second name is required").not().isEmpty(),
    //username must be email
    body('email',"Please include a valid email").isEmail(),
    //min length of password must be 5
    body('password',"Please enter a password with 5 or more characters").isLength({min: 5})
], async (req,res)=>{
    //Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
//    Retrieve data from body
    const {firstname, secondname, email, password} = req.body
    try {
        //    Check if the user is already exist
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({errors: [{msg: "User already exist"}]})
        }
        user = new User({
            firstname,
            secondname,
            email,
            password
        })

        //    Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        await user.save();

        //    Return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }
        const secret = process.env.SECRETKEY
        jwt.sign(payload,secret,{expiresIn: 360000},(err,token)=>{
            if(err) throw err;
            res.json({token})
        })
        console.log(`New user ${user.firstname} has been added`)

    }catch (e) {
        console.log(e.message)
    }
})


module.exports = router