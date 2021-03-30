const express = require("express");
const app = express();
const connectDB = require("./config/database")
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config()
}

const port = process.env.PORT || 4000;

//Middleware
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(bodyParser.json({limit: "50mb", extended: true}));
app.use(cors());

//Routes
app.use("/user",require("./routes/user"))
app.use("/auth",require("./routes/auth"))
app.use("/project",require("./routes/projects"))
app.use("/project/:id/file",require("./routes/files"))

//Connect MongoDB
connectDB()

if(process.env.NODE_ENV === "production"){
    //Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname,"client", "build", "index.html"))
    })
}

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})