var taskService = require('../../services/task/taskService.js');     

var getTaskController = async (req, res) => { 
    try {
         
        var tasks = await taskService.getTaskService(req);
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: "get all tasks failed" });
    }
}
            
var createTaskController = async (req, res) => {
    try {
        var task = await taskService.createTaskService(req.body);
        res.status(200).json({ success: true, task });  
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: "create task failed" });
    }
}
 
var editTaskController = async (req, res) => {
    try {
        var task = await taskService.editTaskService(req.body, req.params.taskId);
        res.status(200).json({ success: true, task });  
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: "edit task failed" });
    }
}

var deleteTaskController = async (req, res) => {
    try {
        var deleteTask = await taskService.deleteTaskService(req.params.taskId);
        res.status(200).json({ success: true });  
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: "edit task failed" });
    }
}

var updateStatusTaskController = async (req, res) => {
    try {
        var statusTask = await taskService.updateStatusTaskService(req.params.taskId, req. params.studentId, req.body);
        res.status(200).json({ success: true, statusTask });  
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: "update task status failed" });
    }
}
module.exports = { getTaskController, createTaskController,
    editTaskController, deleteTaskController,
    updateStatusTaskController } ;         

