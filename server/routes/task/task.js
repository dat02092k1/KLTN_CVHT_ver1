var express = require('express');
var taskController = require('../../controllers/task/taskController.js')
var userAuthenticate = require('../../middleware/authentication.js')
const router = express.Router();

// get tasks
router.get('/student/get-task-all/:class', userAuthenticate.verifyToken, taskController.getTaskController);
// create tasks 
router.post('/student/assign-task', userAuthenticate.isAdminAuthentication, taskController.createTaskController);
// edit task
router.put('/student/edit-task/:taskId', userAuthenticate.isAdminAuthentication, taskController.editTaskController);
// delete task
router.delete('/student/delete-task/:taskId', userAuthenticate.isAdminAuthentication, taskController.deleteTaskController);
// update status task
router.put('/student/task/update-stauts/:taskId/:studentId', userAuthenticate.studentIdAuthentication, taskController.updateStatusTaskController);
// get task details
router.get('/student/task/get-task/:taskId', userAuthenticate.verifyToken, taskController.getDetailsTaskController);
// get task of student
router.get('/student/task/get-tasks/:studentId', userAuthenticate.studentIdAuthentication, taskController.getTasksofStudentController);
// get task pagination
router.get('/student/get/tasks-page/:_class', userAuthenticate.verifyToken, taskController.getTasksPerPageController);

module.exports = router;       
