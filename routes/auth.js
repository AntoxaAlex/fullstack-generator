const express = require("express");
const router = express.Router({mergeParams: true});
const {body, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = require("../middleware/auth")

if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config()
}

//Get user
router.get("/", auth, async (req, res)=>{
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(400).json({msg: "No user"});
        }
        res.json(user)
    }catch (e) {
        console.log(e.message)
    }
})

//Login user
router.post("/", [
        //Username must be email
        body('email',"Please include a valid email").isEmail(),
        //Password id required
        body('password',"Password id required").exists()
    ],
    async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    //Retrieve data from body
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({errors:[{msg: "Invalid credentials"}]});
        }

        //Check password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({errors:[{msg: "Invalid credentials"}]});
        }

        //Create token
        const payload = {
            user:{
                id: user.id
            }
        }
        const secret = process.env.SECRETKEY;
        jwt.sign(payload, secret, {expiresIn: 360000}, (err,token)=>{
            if(err) throw err;
            res.json({token});
        })
        console.log(`User ${user.firstname} is logged in`)
    }catch (e) {
        console.log(e.message)
    }
})

module.exports = router;