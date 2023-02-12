var express = require('express');
var commentController = require('../../controllers/comments/commentController')
var userAuthenticate = require('../../middleware/authentication.js')
const router = express.Router();

// Comment in post
router.post('/post/comment/:id', userAuthenticate.verifyToken, commentController.createCommentController);
// get comments of specified user
router.get('/post/comment-list/:username', userAuthenticate.roleAuthenticationGetUsername, commentController.getSpecifiedCommentController);
// get all posts and related comments
router.get('/post/comment-list', userAuthenticate.isAdminAuthentication, commentController.getPostAndCommentController);




module.exports = router;       
