var express = require('express');
var studentController = require('../../controllers/students/studentsController');  
var userAuthenticate = require('../../middleware/authentication.js')
var uploadController = require('../../controllers/upload/uploadController.js')
var upload = require('../../uploads/multer.js').upload; 
const router = express.Router();

router.post('/upload', userAuthenticate.verifyToken, upload.single('image'), uploadController.uploadImageController);

router.post('/upload-doc', userAuthenticate.verifyToken, upload.single('doc'), uploadController.uploadDocsController);

module.exports = router;       
