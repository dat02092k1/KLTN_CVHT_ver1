const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'students' 
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
        fileUrl: [
            {
                url: {
                    type: String,
                },
                public_id: {
                    type: String,
                }
            }
        ]
    },
    { 
        timestamps: true 
    }
)

module.exports = mongoose.model("reports", reportSchema);