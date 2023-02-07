var express = require('express');
var studentController = require('../../controllers/students/studentsController');  

const router = express.Router();


router.get('/student/getAll/:class', studentController.getDataStudentControllerfn);

router.post('/student/create', studentController.createStudentControllerfn);

router.patch('/student/update/:id', studentController.updateStudentControllerfn);

module.exports = router;       
