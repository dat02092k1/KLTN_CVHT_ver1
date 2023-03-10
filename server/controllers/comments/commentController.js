var commentService = require('../../services/comments/commentService');     
const { ClientError } = require('../../services/error/error.js');

var createCommentController = async (req, res) => { 
    try {
        var comment = await commentService.createCommentService(req.params.id, req.user.username, req.body);
        res.status(200).json({ success: true, comment });
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var getSpecifiedCommentController = async (req, res) => {
    try {
        var comments = await commentService.getComments(req.params.username);
        res.status(200).json({ success: true, comments });
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var getPostAndCommentController = async (req, res) => {
    try {
        
        var postAndComment = await commentService.getPostAndCommentService();  
        res.status(200).json({ success: true, postAndComment });  
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var getPostAndCommentOfUser = async (req, res) => {
    try {
        var postAndComment = await commentService.getPostAndCommentOfUserService(req.params.username);  
        res.status(200).json({ success: true, postAndComment });  
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var deleteCommentController = async (req, res) => {
    try {
        console.log(req.params.username); 
        console.log(req.params.id);
        var deleteComment = await commentService.deleteCommentService(req.params.id);  
        res.status(200).json({ success: true, deleteComment });  
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var editCommentController = async (req, res) => {
    try {
        
        var editComment = await commentService.editCommentService(req.params.id, req.body);  
        res.status(200).json({ success: true, editComment });  
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var getCommentsMapPostId = async (req, res) => {
    try {
        var commentAndPost = await commentService.getCommentsMapPostIdService(req.params.id);
        res.status(200).json({ success: true, commentAndPost }); 
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var getCommentById = async (req, res) => {
    try {
        var comment = await commentService.getCommentByIdService(req.params.id);
        res.status(200).json({ success: true, comment }); 
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}
module.exports = { createCommentController, getSpecifiedCommentController, 
                    getPostAndCommentController, getPostAndCommentOfUser,
                    deleteCommentController, editCommentController,
                    getCommentsMapPostId, getCommentById } ;  