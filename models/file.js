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
    folder:{
        type: String
    }
})

module.exports = mongoose.model("File",fileSchema)