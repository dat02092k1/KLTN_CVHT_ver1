var express = require('express');
var scoreController = require('../../controllers/score/scoreController.js')
var userAuthenticate = require('../../middleware/authentication.js')
const router = express.Router();

// get cpa
router.get('/student/get-score/:id', userAuthenticate.roleAuthentication, scoreController.getScoreController);

 
module.exports = router;       
