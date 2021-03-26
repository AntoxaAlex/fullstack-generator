const mongoose = require("mongoose");
const endObj = {
    archType:{
        type: String,
        required: true
    },
    files: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "File"
        }
    ]
}

let projectSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectID,
        ref: "User"
    },
    users:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectID,
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
            type: String,
            required: true
        }
    ],
    frontend:endObj,
    backend:endObj,
    folders:[{
        section:{
            type: String
        },
        title: {
            type:String
        },
        files:[
            {
                file:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref: "File"
                }
            }
        ]
    }],
    interdependence:[
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "File"
            },
            receiver: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "File"
            },
            action: {
                type: String
            }
        }
    ],
    checklist:[
        {
            title:{
                type: String
            },
            paragraphs: [
                {
                    text:{
                        type: String
                    },
                    isParCompleted:{
                        type: Boolean
                    }
                }
            ],
            isItemCompleted:{
                type: Boolean
            }
        }
    ],
    projectView:[
        {
            src:{
                type:String
            },
            title:{
                type:String
            }
        }
    ],
    workingTime:{
        type: Number
    },
    theme:{
        type: String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Project", projectSchema)