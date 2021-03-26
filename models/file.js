const mongoose = require("mongoose");

let fileSchema = new mongoose.Schema({
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    section:{
        type: String,
        required: true
    },
    type:{
      type: String,
      required: true
    },
    title:{
        type: String,
        required: true
    },
    features:[
        {
            text:{
                type:String
            }
        }
    ],
    subfiles:[
        {
            type:{
                type:String,
                required: true
            },
            purpose:{
                type: String,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model("File",fileSchema)