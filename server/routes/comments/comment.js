var express = require('express');
var commentController = require('../../controllers/comments/commentController')
var userAuthenticate = require('../../middleware/authentication.js')
const router = express.Router();

// Comment in post
router.post('/post/comment/create/:id', userAuthenticate.verifyToken, commentController.createCommentController);
// get comments of specified user
router.get('/post/comment-list/:username', userAuthenticate.roleAuthenticationGetUsername, commentController.getSpecifiedCommentController);
// get all posts and related comments
router.get('/post/comment-list', userAuthenticate.isAdminAuthentication, commentController.getPostAndCommentController);
// get all posts and related comments of username
router.get('/post-comment-list/:username', userAuthenticate.roleAuthenticationGetUsername, commentController.getPostAndCommentOfUser);
// delete comments of username
router.delete('/post/comment/delete/:username/:id', userAuthenticate.roleAuthenticationGetUsername, commentController.deleteCommentController);
// edit comments of username 
router.put('/post/comment/edit/:username/:id', userAuthenticate.roleAuthenticationGetUsername, commentController.editCommentController);






module.exports = router;       
