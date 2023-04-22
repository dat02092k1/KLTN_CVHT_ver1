var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var taskSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String, 
  },
  duration: {
    type: Date,
  },
  _class: {
    type: String,
  },
  assignedStudents: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      studentId: {
        type: String
      },
      isCompleted: {
        type: Boolean,
        default: false,
      },
    },
  ],
  createdAt: { 
    type: Date, 
    default: Date.now },  
});

module.exports = mongoose.model("tasks", taskSchema);
