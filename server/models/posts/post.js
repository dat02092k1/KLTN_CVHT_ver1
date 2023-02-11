const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        username: {
            type: String,
            required: true  
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },  
        _class: {
            type: String 
        }
    },
    { 
        timestamps: true 
    }
)

module.exports = mongoose.model("posts", postSchema);