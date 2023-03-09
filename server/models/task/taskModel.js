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
  assignedStudents: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "students",
        required: true,
      },
      isCompleted: {
        type: Boolean,
        default: false,
      },
    },
  ],
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: { 
    type: Date, 
    default: Date.now },  
});

module.exports = mongoose.model("tasks", taskSchema);
