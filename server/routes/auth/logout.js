var express = require('express');
const logout = require('../../controllers/auth/logoutController');  
var userAuthenticate = require('../../middleware/authentication.js')

const router = express.Router();



router.post("/user/logout", userAuthenticate.verifyToken ,logout.logoutController)
/**
 * {
            "studentId": "covana@vnu",
            "password": "covana"
}
 */

module.exports = router; 