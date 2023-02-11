var express = require('express');
var postController = require('../../controllers/posts/postController.js')
var userAuthenticate = require('../../middleware/authentication.js')
const router = express.Router();

// FORUM FAQ FOR STUDENTS APIS
router.get('/post/list/:class', userAuthenticate.verifyToken, postController.getPostListController);
// get list of posts of specified class
router.post('/post/create/:id', userAuthenticate.verifyToken, postController.createPostController);
// create a post on forum
router.put('/post/edit/:id', userAuthenticate.verifyToken, postController.updatePostController);
// edit post on forum
router.delete('/post/delete/:id', userAuthenticate.verifyToken, postController.deletePostController);
// delete post on forum
router.get('post/list/:id', userAuthenticate.verifyToken, postController.listUserPostController);




module.exports = router;       
