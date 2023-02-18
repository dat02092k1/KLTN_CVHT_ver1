var commentService = require('../../services/comments/commentService');     

var createCommentController = async (req, res) => { 
    try {
        var comment = await commentService.createCommentService(req.params.id, req.user.username, req.body);
        res.status(200).json({ success: true, comment });
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: "create comment failed" });
    }
}

var getSpecifiedCommentController = async (req, res) => {
    try {
        var comments = await commentService.getComments(req.params.username);
        res.status(200).json({ success: true, comments });
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: `can get comments of this user` });
    }
}

var getPostAndCommentController = async (req, res) => {
    try {
        
        var postAndComment = await commentService.getPostAndCommentService();  
        res.status(200).json({ success: true, postAndComment });  
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: `server error` });
    }
}

var getPostAndCommentOfUser = async (req, res) => {
    try {
        var postAndComment = await commentService.getPostAndCommentOfUserService(req.params.username);  
        res.status(200).json({ success: true, postAndComment });  
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: `server error` });
    }
}

var deleteCommentController = async (req, res) => {
    try {
        console.log(req.params.username); 
        console.log(req.params.id);
        var deleteComment = await commentService.deleteCommentService(req.params.id);  
        res.status(200).json({ success: true, deleteComment });  
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: `server error` });
    }
}

var editCommentController = async (req, res) => {
    try {
        console.log(req.body);
        var editComment = await commentService.editCommentService(req.params.id, req.body);  
        res.status(200).json({ success: true, editComment });  
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: `server error` });
    }
}

var getCommentsMapPostId = async (req, res) => {
    try {
        var commentAndPost = await commentService.getCommentsMapPostIdService(req.params.id);
        res.status(200).json({ success: true, commentAndPost }); 
    } catch (error) {
        console.log(error);
    }
}
module.exports = { createCommentController, getSpecifiedCommentController, 
                    getPostAndCommentController, getPostAndCommentOfUser,
                    deleteCommentController, editCommentController,
                    getCommentsMapPostId } ;  