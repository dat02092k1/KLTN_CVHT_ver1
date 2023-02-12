var express = require('express');
const login = require('../../controllers/auth/loginController');  

const router = express.Router();



router.post("/user/login", login.loginController)
/**
 * {
            "studentId": "covana@vnu",
            "password": "covana"
}
 */


router.post("/token/refresh", login.refreshToken);

module.exports = router; 