const mongoose = require("mongoose");
if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config()
}

//Environment variables
const dburl = process.env.DBURL

const dbConnect = async ()=>{
    try {
        await mongoose.connect(dburl,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log("Database has been successfully connected")
    }catch (e) {
        console.log('DB did not connected: ' + e.message);
        //Exit process with failure
        process.exit(1);
    }
}

module.exports = dbConnect;