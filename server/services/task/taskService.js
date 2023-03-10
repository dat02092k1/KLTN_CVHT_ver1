const studentModel = require('../../models/students/studentsModel.js');
const taskModel = require('../../models/task/taskModel');
const { ClientError } = require('../error/error.js');

const mongoose = require('mongoose');

var getTaskService = async (req) => { 
    try { 
        const {
            createdBy
        } = req.query;
         
        const tasks = await taskModel.find({ createdBy: createdBy })
        if (!tasks) throw new ClientError(`tasks not found`, 404);

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
            console.log(item.student);
            const studentAssign = await studentModel.findById(item.student);
             
            if (!studentAssign) {
                throw new ClientError("Không tìm thấy sinh viên", 404)
                } 
              item.studentId = studentAssign.studentId; 
              }
          
              console.log(assignedStudents); 

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
        const { assignedStudents } = taskDetails; 
         
        for (const item of assignedStudents) {
            const studentAssign = await studentModel.findById(item.student);
             
            if (!studentAssign) {
                throw new ClientError("Không tìm thấy sinh viên", 404)
                } 
              item.studentId = studentAssign.studentId; 
              } 
        console.log(taskDetails);   
    
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
        throw new ClientError('Task not found', 404);
    }

    const assignedStudent = task.assignedStudents.find(
        (assignedStudent) => assignedStudent.student.toString() === studentId
      );
  
      if (!assignedStudent) {
        throw new ClientError('Assigned student not found', 404);
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