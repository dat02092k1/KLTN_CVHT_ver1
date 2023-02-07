var express = require('express');
var studentController = require('../../controllers/students/studentsController');  

const router = express.Router();


router.get('/student/getAll/:class', studentController.getDataStudentControllerfn);

router.post('/student/create', studentController.createStudentControllerfn);

router.patch('/student/update/:id', studentController.updateStudentControllerfn);

router.get('/student/details/:id', studentController.getDetailStudentfn);

router.delete('/student/remove/:id', studentController.deleteStudentControllerfn);


module.exports = router;       
