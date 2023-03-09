const studentModel = require('../../models/students/studentsModel.js');
const taskModel = require('../../models/task/taskModel');

const mongoose = require('mongoose');

var getTaskService = async (req) => { 
    try { 
        const {
            createdBy
        } = req.body;

        const tasks = await taskModel.find({ createdBy: createdBy })
        if (!tasks) throw new Error(`tasks not found`);

        return tasks;   
    } catch (error) {
        throw error;
    }
}

var createTaskService = async (taskDetail) => {
    try {
        const { task, description, assignedStudents, createdBy } = taskDetail;    
        console.log(taskDetail); 

        for (const item of assignedStudents) {
            const studentAssign = await studentModel.findById(item.student);
            if (!studentAssign) {
                throw new Error("Không tìm thấy sinh viên")
                } 
              }
          

        const newTask = new taskModel({
        task,
        description,               
        assignedStudents,
        createdBy   
    });

    await newTask.save();  

        return newTask; 
    } catch (error) {
        throw error;
    }
}

var editTaskService = async (taskDetails, taskId) => {
    try {
        
        console.log(taskId, taskDetails); 

        const task = await taskModel.findByIdAndUpdate(taskId, taskDetails, { new: true });  

        if (!task) res.status(500).json({ message: 'update task failed' });
             
        return task;
    } catch (error) {
        throw error;
    }
}

var deleteTaskService = async (taskId) => {
    try {
        const task = await taskModel.findByIdAndDelete(taskId);  

        if (!task) res.status(500).json({ message: 'delete task failed' });
             
        return task;
    } catch (error) {
        throw error;
    }
}

var updateStatusTaskService = async (taskId, studentId, taskDetail) => {
    const { isCompleted } = taskDetail;
    try {
        const task = await taskModel.findById(taskId);

        console.log(isCompleted);
    if (!task) {
      throw new Error('Task not found');
    }

    const assignedStudent = task.assignedStudents.find(
        (assignedStudent) => assignedStudent.student.toString() === studentId
      );
  
      if (!assignedStudent) {
        throw new Error('Assigned student not found');
      }

      
      assignedStudent.isCompleted = isCompleted;
    await task.save();
    
    return task;

    } catch (error) {
        throw error;
    }
}
module.exports = { getTaskService, createTaskService,
    editTaskService, deleteTaskService,
    updateStatusTaskService } ;  