var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({  
    semester: {
        type: String,
        required: true              
    },
    semesterCode: {
      type: Number,
        required: true 
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        index: true
    },
    studentId: { 
      type: String
    },
    subjects: [{
        name: {
          type: String,
          required: true
        },
        code: {
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
        },
        grade: {
          type: String, 
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