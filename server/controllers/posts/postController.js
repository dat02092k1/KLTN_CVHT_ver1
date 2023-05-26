var postService = require('../../services/post/postService');     
const { ClientError } = require('../../services/error/error.js');

var getPostListController = async (req, res) => { 
    try {
        console.log(req.params);
        console.log('post class');
        var postList = await postService.getPostListService(req);
        res.status(200).json({ success: true, postList });
    } catch (error) {
        console.log(error);
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var createPostController = async (req, res) => {
    try {
          
        var newPost = await postService.createPostService(req.body); 
        res.status(200).json({ success: true, newPost });
    } catch (error) {
        console.log(error);
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var updatePostController = async (req, res) => {
    try {
        var update = await postService.updatePostService(req.params.id, req.body);
        res.status(200).json({ success: true, update });
    } catch (error) {
        console.log(error);
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}           

var deletePostController = async (req, res) => {
    try {
        var deletePost = await postService.deletePostService(req.params.id);
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var listPostsPerPage = async (req, res) => {
    try {
         
        var list = await postService.listPostsPerPageService(req);
        
        res.status(200).json({ success: true, list})
    } catch (error) {
        console.log(error);
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

module.exports = { getPostListController, createPostController, 
    updatePostController, deletePostController, listPostsPerPage } ;  