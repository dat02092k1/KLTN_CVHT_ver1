var express = require('express');
var studentController = require('../../controllers/students/students');  

const router = express.Router();


router.get('/students/getAll', studentController.getDataStudentControllerfn);

module.exports = router;       
