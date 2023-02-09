var express = require('express');
const login = require('../../controllers/auth/loginController');  

const router = express.Router();



router.post("/user/login", login.loginController)

module.exports = router; 