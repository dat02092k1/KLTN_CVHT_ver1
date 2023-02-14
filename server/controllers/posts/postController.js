var postService = require('../../services/post/postService');     

var getPostListController = async (req, res) => { 
    try {
        console.log(req.params.class); 
        var postList = await postService.getPostListService(req.params.class);
        res.status(200).json({ success: true, postList });
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: "get list posts failed" });
    }
}

var createPostController = async (req, res) => {
    try {
        
        var newPost = await postService.createPostService(req.body); 
        res.status(200).json({ success: true, newPost });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
}

var updatePostController = async (req, res) => {
    try {
        var update = await postService.updatePostService(req.params.id ,req.body);
        res.status(200).json({ success: true, update });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
}           

var deletePostController = async (req, res) => {
    try {
        var deletePost = await postService.deletePostService(req.params.id);
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
}

var listUserPostController = async (req, res) => {
    try {
        console.log(req.params.username)
        var list = await postService.listPostOfUser(req.params.username);
        
        res.status(200).json({ success: true, list})
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports = { getPostListController, createPostController, 
    updatePostController, deletePostController, listUserPostController } ;  