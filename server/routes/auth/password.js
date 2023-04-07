var express = require('express');
const password = require('../../controllers/auth/passwordController.js');  
var userAuthenticate = require('../../middleware/authentication.js')

const router = express.Router();

// change password
router.post("/user/change-password/:id", userAuthenticate.onlyOwner, password.changePasswordController)
// forget password & send email
router.post("/user/forget-password", password.forgetPasswordController)
// reset password
router.post("/user/reset-password", password.resetPasswordController)


module.exports = router; 