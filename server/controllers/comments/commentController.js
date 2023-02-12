var commentService = require('../../services/comments/commentService');     

var createCommentController = async (req, res) => { 
    try {
        var comment = await commentService.createCommentService(req.params.id, req.body);
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
module.exports = { createCommentController, getSpecifiedCommentController, getPostAndCommentController } ;  