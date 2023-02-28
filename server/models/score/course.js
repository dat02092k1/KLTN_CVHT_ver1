var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({  
    semester: {
        type: String,
        required: true              
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students'
    },
    subjects: [{
        name: {
          type: String,
          required: true
        },
        score: {
          type: Number,
          required: true
        },
        credits: {
            type: Number,
            required: true   
        }
      }],  
    GPA: {
        type: Number,
        default: 0
      },
    total_credits: {            
        type: Number,
        default: 0
      },
    

});

module.exports = mongoose.model('courses', courseSchema);