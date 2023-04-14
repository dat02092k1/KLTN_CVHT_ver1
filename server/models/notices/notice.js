const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noticeSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'students'
        },
        subject: {
            type: String,
            required: true
        },
        message: {
            type: String, 
            required: true 
        },
        _class: {
            type: String, 
            required: true 
        }
    },
    { 
        timestamps: true 
    }
)

module.exports = mongoose.model("notices", noticeSchema);