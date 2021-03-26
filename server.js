const express = require("express");
const app = express();
const connectDB = require("./config/database")
const bodyParser = require("body-parser");
const cors = require("cors");
const WSServer = require("express-ws")(app);
const aWss = WSServer.getWss();


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

const broadCastConnection = (ws,msg) => {
    aWss.clients.forEach(client=>{
        if(client.id === ws.id){
            client.send(`User ${msg.name} is connected`)
        }
    })
}

const connectionHandler = (ws,msg) => {
    ws.id = msg.project_id;
    broadCastConnection(ws,msg)
}

app.ws("/",(ws,req)=>{
    ws.send("You has been successfully connected");
    ws.on("message",(msg)=>{
        msg = JSON.parse(msg);
        switch (msg.method) {
            case "connection":
                connectionHandler(ws,msg);
                break;

        }
    })
})

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