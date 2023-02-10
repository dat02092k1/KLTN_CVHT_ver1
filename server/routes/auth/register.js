var express = require('express');
const registerController = require('../../controllers/auth/registerController.js');  

const router = express.Router();



router.post("/student/register", registerController.createStudentAccount)
/* 
"studentId": "19021526",
    "password": "19021526",
    "role": "student"
*/
module.exports = router; 