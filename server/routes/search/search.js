var express = require('express');
var searchController = require('../../controllers/search/searchController.js')
var userAuthenticate = require('../../middleware/authentication.js')
const router = express.Router();

// Comment in post
router.get('/student/search', userAuthenticate.verifyToken, searchController.getStudentController);







module.exports = router;       
