var express = require('express');
var studentController = require('../../controllers/students/studentsController');  
var userAuthenticate = require('../../middleware/authentication.js')
const router = express.Router();


router.get('/student/getAll/:class', userAuthenticate.verifyToken, studentController.getDataStudentControllerfn);

router.post('/student/create', userAuthenticate.roleAuthentication ,studentController.createStudentControllerfn);

router.patch('/student/update/:id', userAuthenticate.roleAuthentication, studentController.updateStudentControllerfn);

router.get('/student/details/:id', userAuthenticate.roleAuthentication ,studentController.getDetailStudentfn);

router.delete('/student/remove/:id', userAuthenticate.roleAuthentication ,studentController.deleteStudentControllerfn);


module.exports = router;       
