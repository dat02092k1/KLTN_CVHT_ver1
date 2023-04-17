var express = require('express');
var courseController = require('../../controllers/score/courseController.js')
var userAuthenticate = require('../../middleware/authentication.js')
var validate = require('../../middleware/validation.js');

var upload = require('../../uploads/multer.js').upload;

const router = express.Router();

// add course
router.post('/student/add-course', userAuthenticate.roleAuthentication, courseController.addCourseController);
// get courses
router.get('/student/get-course/:studentId', userAuthenticate.studentIdAuthentication, courseController.getCourseController);
// edit course
router.put('/student/edit-course/:courseId', userAuthenticate.isManagerAuth, courseController.editCourseController);
// delete course  
router.delete('/student/delete-course/:courseId', userAuthenticate.isManagerAuth, courseController.deleteCourseController);
// get course details
router.get('/student/course/:courseId', userAuthenticate.isAdminAuthentication, courseController.getCourseDetailsController);
// import courses by excel
router.post('/student/course/import', userAuthenticate.isManagerAuth, upload.single('file'), validate.validateCourse, courseController.importCoursesExcel);

module.exports = router;       
