var express = require('express');
var commentController = require('../../controllers/comments/commentController')
var userAuthenticate = require('../../middleware/authentication.js')
const router = express.Router();

// Comment in post
router.post('/post/comment/create/:id', userAuthenticate.verifyToken, commentController.createCommentController);
// get comments of specified user
router.get('/post/comment-list/:username', userAuthenticate.roleAuthenticationGetUsername, commentController.getSpecifiedCommentController);
// get comments mapping post-id
router.get('/comment/post/:id', userAuthenticate.verifyToken, commentController.getCommentsMapPostId);
// get all posts and related comments
router.get('/post/comment-list', userAuthenticate.isAdminAuthentication, commentController.getPostAndCommentController);
// get all posts and related comments of username
router.get('/post-comment-list/:username', userAuthenticate.roleAuthenticationGetUsername, commentController.getPostAndCommentOfUser);
// delete comments of username
router.delete('/post/comment/delete/:id', userAuthenticate.verifyToken, commentController.deleteCommentController);
// edit comments of username 
router.put('/post/comment/edit/:username/:id', userAuthenticate.onlyOwner, commentController.editCommentController);
// get unique comments
router.get('/post/comment/view/:id', userAuthenticate.verifyToken, commentController.getCommentById);






module.exports = router;       
