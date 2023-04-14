var taskService = require('../../services/task/taskService.js');     
const { ClientError } = require('../../services/error/error.js');

var getTaskController = async (req, res) => { 
    try {
        console.log(req.params.class);   
        var tasks = await taskService.getTaskService(req.params.class);
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}
            
var createTaskController = async (req, res) => {
    try {
        var task = await taskService.createTaskService(req.body);
        res.status(200).json({ success: true, task });  
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}
 
var editTaskController = async (req, res) => {
    try {
        var task = await taskService.editTaskService(req.body, req.params.taskId);
        res.status(200).json({ success: true, task });  
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var deleteTaskController = async (req, res) => {
    try {
        var deleteTask = await taskService.deleteTaskService(req.params.taskId);
        res.status(200).json({ success: true });  
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var updateStatusTaskController = async (req, res) => {
    try {
        var statusTask = await taskService.updateStatusTaskService(req.params.taskId, req.params.studentId, req.body);
        res.status(200).json({ success: true, statusTask });  
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var getDetailsTaskController = async (req, res) => {
    try {
        var task = await taskService.getDetailsTaskService(req.params.taskId);
        res.status(200).json({ success: true, task });  
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var getTasksofStudentController = async (req, res) => {
    try {
        var tasks = await taskService.getTasksofStudentService(req.params.studentId);
        res.status(200).json({ success: true, tasks });  
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var getTasksPerPageController = async (req, res) => {
    try {
        var tasks = await taskService.getTasksPerPageService(req);
        res.status(200).json({ success: true, tasks });  
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}
module.exports = { getTaskController, createTaskController,
    editTaskController, deleteTaskController,
    updateStatusTaskController, getDetailsTaskController,
    getTasksofStudentController, getTasksPerPageController } ;         

