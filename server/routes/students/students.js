var express = require('express');
var studentController = require('../../controllers/students/studentsController');  

const router = express.Router();


router.get('/students/getAll/:class', studentController.getDataStudentControllerfn);

module.exports = router;       
