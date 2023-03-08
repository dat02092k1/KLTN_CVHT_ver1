var express = require('express');
var studentController = require('../../controllers/students/studentsController');  
var userAuthenticate = require('../../middleware/authentication.js');  
var validate = require('../../middleware/validation.js');
var upload = require('../../uploads/multer.js').upload;

const router = express.Router();


router.get('/student/getAll/:class', userAuthenticate.isAdminAuthentication, studentController.getDataStudentControllerfn);

router.post('/student/create', userAuthenticate.roleAuthentication ,studentController.createStudentControllerfn);

router.patch('/student/update/:id', userAuthenticate.roleAuthentication, studentController.updateStudentControllerfn);

router.get('/student/details/:id', userAuthenticate.verifyToken, userAuthenticate.roleAuthentication ,studentController.getDetailStudentfn);

router.delete('/student/remove/:id', userAuthenticate.verifyToken, userAuthenticate.roleAuthentication ,studentController.deleteStudentControllerfn);

router.get('/student/names/:class', userAuthenticate.verifyToken, studentController.getNameStudentController);

router.post('/student/import-excel', userAuthenticate.isAdminAuthentication, upload.single('file'), validate.validateFieldsMiddleware, studentController.uploadStudentsController);

module.exports = router;       
