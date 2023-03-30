var express = require('express');
const password = require('../../controllers/auth/passwordController.js');  
var userAuthenticate = require('../../middleware/authentication.js')

const router = express.Router();

// change password
router.post("/user/change-password/:id", userAuthenticate.onlyOwner, password.changePasswordController)


module.exports = router; 