const mongoose = require("mongoose");

const checklistSchema = new mongoose.Schema({
    frontArch:{
        type: String,
        required: true
    },
    backArch:{
        type: String,
        required: true
    },
    items:[
        {
            title: {
                type: String,
                required: true
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
    ]
})

module.exports = mongoose.model("Checklist",checklistSchema)