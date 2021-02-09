const jwt = require("jsonwebtoken");
if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

module.exports = function (req, res, next) {
    //Get token from the header
    const token = req.header("x-auth-token");
    //Get secret from .env
    const secret = process.env.SECRETKEY;

    //Check if no token
    if(!token){
        return res.status(401).json({msg: "No token, authorisation denied"});
    }

    //Verify token
    try {
        const decoded = jwt.verify(token,secret);
        req.user = decoded.user;
        next();
    }catch (e) {
        res.status(401).json({msg: "Token is not valid"});
    }
}