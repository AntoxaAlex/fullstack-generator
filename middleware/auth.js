const jwt = require("jsonwebtoken");
if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

module.exports = async (req, res, next)  =>{
    //Get token from the header
    const token = await req.header("x-auth-token");
    //Get secret from .env
    const secret =await process.env.SECRETKEY;

    //Check if no token
    if(!req.header("x-auth-token")){
        return res.status(401).json({msg: "You have no token, authorisation denied"});
    }

    //Verify token
    try {
        console.log(req.header("x-auth-token"))
        const decoded = jwt.verify(token,secret);
        req.user = decoded.user;
        next();
    }catch (e) {
        res.status(401).json({msg: "Token is not valid"});
    }
}