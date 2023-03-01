var express = require('express');
var scoreController = require('../../controllers/score/scoreController.js')
var userAuthenticate = require('../../middleware/authentication.js')
const router = express.Router();

// get cpa
router.get('/student/get-score/:id', userAuthenticate.roleAuthentication, scoreController.getScoreController);
// get cpa of student by class 
router.get('/student/get-score-class/:class', userAuthenticate.isAdminAuthentication, scoreController.getClassScoreController);

 
module.exports = router;       
