const studentModel = require("../../models/students/studentsModel.js");
const taskModel = require("../../models/task/taskModel");
const { ClientError } = require("../error/error.js");

const mongoose = require("mongoose");

var getTaskService = async (req) => {
  try {
    const { createdBy } = req.query;

    const tasks = await taskModel.find({ createdBy: createdBy }).sort({ createdAt: -1 });
    if (!tasks) throw new ClientError(`tasks not found`, 404);

    return tasks;
  } catch (error) {
    throw error;
  }
};

var createTaskService = async (taskDetail) => {
  try {
    const { task, description, assignedStudents, createdBy, duration } = taskDetail;

    console.log(taskDetail);
    for (const item of assignedStudents) {
      console.log(item.student);
      const studentAssign = await studentModel.findById(item.student);

      if (!studentAssign) {
        throw new ClientError("Không tìm thấy sinh viên", 404);
      }
      item.studentId = studentAssign.studentId;
    }

    console.log(assignedStudents);

    const newTask = new taskModel({
      task,
      description,
      assignedStudents,
      duration,
      createdBy,
    });

    await newTask.save();

    return newTask;
  } catch (error) {
    throw error;
  }
};

var editTaskService = async (taskDetails, taskId) => {
  try {
    const { assignedStudents } = taskDetails;
    console.log(assignedStudents);

     // Check for duplicate items in the assignedStudents array
     const studentIds = new Set();
     for (const item of assignedStudents) {
       if (studentIds.has(item.student)) {
         throw new ClientError("Duplicate student id " + item.student, 400);
       }
       studentIds.add(item.student);
     }
 
    for (const item of assignedStudents) {
      const studentAssign = await studentModel.findById(item.student);

      if (!studentAssign) {
        throw new ClientError("Không tìm thấy sinh viên " + item.student , 404);
      }
      item.studentId = studentAssign.studentId;
    }
    console.log(taskDetails);

    const task = await taskModel.findByIdAndUpdate(taskId, taskDetails, {
      new: true,
    });

    if (!task) res.status(500).json({ message: "update task failed" });

    return task;
  } catch (error) {
    throw error;
  }
};

var deleteTaskService = async (taskId) => {
  try {
    const task = await taskModel.findByIdAndDelete(taskId);

    if (!task) res.status(500).json({ message: "delete task failed" });

    return task;
  } catch (error) {
    throw error;
  }
};

var updateStatusTaskService = async (taskId, studentId, taskDetail) => {
  const { isCompleted } = taskDetail;
  try {
    const task = await taskModel.findById(taskId);

    console.log(isCompleted);
    if (!task) {
      throw new ClientError("Task not found", 404);
    }

    const assignedStudent = task.assignedStudents.find(
      (assignedStudent) => assignedStudent.student.toString() === studentId
    );

    if (!assignedStudent) {
      throw new ClientError("Assigned student not found", 404);
    }

    assignedStudent.isCompleted = isCompleted;
    await task.save();

    return task;
  } catch (error) {
    throw error;
  }
};

var getDetailsTaskService = async (taskId) => {
  try {
    console.log(taskId);
    const task = await taskModel.findById(taskId);
    if (!task) throw new ClientError(`task not found`, 404);

    return task;
  } catch (error) {
    throw error;
  }
};

var getTasksofStudentService = async (id) => {
  try {
    console.log(id);
    const tasks = await taskModel.find({ "assignedStudents.student": id });
    if (!tasks) throw new ClientError(`there're no tasks found`, 404);

    return tasks;
  } catch (error) {
    throw error;
  }
};

var getTasksPerPageService = async (req) => {
  try {
    const createdBy = req.params.username; 
     
    const page = req.query.page || 1;
    console.log(page);
    const pageSize = 3;
    const skip = (page - 1) * pageSize;                

    const totalTask = await taskModel.find({ createdBy: createdBy });

    const tasks = await taskModel.find({ createdBy: createdBy })
                                   .sort({ createdAt: -1 })
                                   .skip(skip)
                                   .limit(pageSize);

    if (!tasks) throw new ClientError(`there're no tasks found`, 404);

    const total = Math.ceil(totalTask.length / 3);

    return {
      total, tasks
    };
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getTaskService,
  createTaskService,
  editTaskService,
  deleteTaskService,
  updateStatusTaskService,
  getDetailsTaskService,
  getTasksofStudentService,
  getTasksPerPageService
};
