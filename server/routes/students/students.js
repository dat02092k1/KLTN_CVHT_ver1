var express = require('express');
var studentController = require('../../controllers/students/studentsController');  
var userAuthenticate = require('../../middleware/authentication.js');  
var validate = require('../../middleware/validation.js');
var upload = require('../../uploads/multer.js').upload;

const router = express.Router();

// Students 
router.get('/student/getAll/:class', userAuthenticate.isAdminAuthentication, studentController.getDataStudentControllerfn);
// get all students
router.post('/student/create', userAuthenticate.isManagerAuth, studentController.createStudentControllerfn);
// create student
router.patch('/student/update/:id', userAuthenticate.roleAuthentication, studentController.updateStudentControllerfn);
// edit student
router.get('/student/details/:id', userAuthenticate.studentIdAuthentication, studentController.getDetailStudentfn);
// details of student
router.delete('/student/remove/:id', userAuthenticate.isManagerAuth ,studentController.deleteStudentControllerfn);
// delete student
router.get('/student/names/:class', userAuthenticate.verifyToken, studentController.getNameStudentController);
// get students by class
router.post('/student/import-excel', userAuthenticate.isManagerAuth, upload.single('file'), validate.validateFieldsMiddleware, studentController.uploadStudentsController);
// import studnets by excel
router.get('/student/status/:class', userAuthenticate.isAdminAuthentication, studentController.getStudentStatusController);
// get students by class and status
router.get('/student/in-class/:id', userAuthenticate.verifyToken, studentController.getStudentsInClass);
// get students in class 
router.get('/student/all-class', userAuthenticate.isManagerAuth, studentController.getAllClass);
// get all classes
router.get('/users/in/:class', userAuthenticate.isManagerAuth, studentController.getUsersInClass);

// get all classes
/**
 * for test function
 */
router.get('/student/get-details/:username' ,studentController.getStudentDetails);

module.exports = router;       
