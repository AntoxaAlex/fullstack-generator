const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    section:{
        type: String,
        required: true
    },
    type:{
      type: String,
      required: true
    },
    purpose:{
        type: String,
        required: true
    },
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