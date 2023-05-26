const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'users' 
        },
        username: {
            type: String,
                         
        },
        title: {
            type: String,
        },
        content: {
            type: String,
            required: true
        },  
        _class: {
            type: String 
        },
        imageUrl: {
            type: String, 
        }
    },
    { 
        timestamps: true 
    }
)

module.exports = mongoose.model("posts", postSchema);