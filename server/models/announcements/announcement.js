const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const announcementSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'users'
        },
        title: {
            type: String,
            required: true
        },
        fileUrl: {
            type: String, 
            required: true 
        }
    },
    { 
        timestamps: true 
    }
)

module.exports = mongoose.model("announcements", announcementSchema);