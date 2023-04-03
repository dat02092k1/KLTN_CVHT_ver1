var express = require('express');
var courseController = require('../../controllers/score/courseController.js')
var userAuthenticate = require('../../middleware/authentication.js')
const router = express.Router();

// add course
router.post('/student/add-course', userAuthenticate.roleAuthentication, courseController.addCourseController);
// get courses
router.get('/student/get-course/:studentId', userAuthenticate.studentIdAuthentication, courseController.getCourseController);
// edit course
router.put('/student/edit-course/:courseId', userAuthenticate.roleAuthentication, courseController.editCourseController);
// delete course  
router.delete('/student/delete-course/:courseId', userAuthenticate.roleAuthentication, courseController.deleteCourseController);
// get course details
router.get('/student/course/:courseId', userAuthenticate.roleAuthentication, courseController.getCourseDetailsController);

module.exports = router;       
