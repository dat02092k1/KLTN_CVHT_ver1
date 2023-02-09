var express = require('express');
const registerController = require('../../controllers/auth/registerController.js');  

const router = express.Router();



router.post("/student/register", registerController.createStudentAccount)

module.exports = router; 