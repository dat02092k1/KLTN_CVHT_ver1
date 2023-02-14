const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        postId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'posts' 
        },
        username: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    { 
        timestamps: true 
    }
)

module.exports = mongoose.model("comments", commentSchema);