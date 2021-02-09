const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    users:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    title: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    goals:[
        {
            goal:{
                type: String,
                required: true
            }
        }
    ],
    stack:{
        type: String,
        required: true
    },
    frontend:[
        {
            file:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "File"
            }
        }
    ],
    backend:[
        {
            file:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "File"
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Project", projectSchema)