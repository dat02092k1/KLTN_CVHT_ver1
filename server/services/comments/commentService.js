const commentModel = require('../../models/comments/comment.js');
const postModel = require('../../models/posts/post.js');
const userModel = require('../../models/students/userModel.js');

const { ClientError } = require('../error/error.js');

const mongoose = require('mongoose');

var createCommentService = async (id, userId, commentDetails) => {
    try {
        const postId = id;
        const {
            content
            } = commentDetails; 

        const getStudent = await userModel.findById(userId);
         
        const username = getStudent.userId; 

        const newComment = new commentModel({
            postId, 
            userId, 
            username,
            content
        })

        await newComment.save();
        
        return newComment; 
    } catch (error) {
        throw error;
    }
}

var getComments = async (username) => {
    try {
        const listComments = await commentModel.find({ username: username}); 

        if (!listComments) throw new ClientError("There're no comments at all", 404); 

        else return listComments;  
    } catch (error) {
        throw error;
    }
}

var getPostAndCommentService = async () => {
        try {
            const posts = await postModel.find();
            const postIds = posts.map(post => post._id);
            const comments = await commentModel
                        .find({ postId: { $in: postIds } })
                        .populate('postId');
        return { posts, comments };

        } catch (error) {
            throw error;
        }
}

var getPostAndCommentOfUserService = async (username) => {
    try {
        const posts = await postModel.find({ username });
            const postIds = posts.map(post => post._id);
            const comments = await commentModel
                        .find({ postId: { $in: postIds } })
                        .populate('postId');
        return { posts, comments };
    } catch (error) {
        throw error;
    }
}

var deleteCommentService = async (id) => {
    try {
        const deleteComment = await commentModel.findByIdAndDelete(id);

        if (deleteComment) {
            return "Deleted successfully!";
        } else {
            throw new ClientError('Comment is not found', 404);
          }
    } catch (error) {
        throw error;
    }
}

var editCommentService = async (id, commentDetails) => {
    try {
        const updateComment = await commentModel.findByIdAndUpdate(id, commentDetails, { new: true }); 
         
        if (!updateComment) {
            throw new ClientError(`No post found with id: ${id}`, 404);  
        } 

        return updateComment;
    } catch (error) {
        throw error;
    }
}

var getCommentsMapPostIdService = async (id) => {
    try {
        const post = await postModel.findById(id); 

        if (!post) throw new ClientError("Post not found", 404); 

        const comments = await commentModel.find({ postId: id });

        return ({ post, comments });
    } catch (error) {
        throw error;
    }
}

var getCommentByIdService = async (id) => {
    try {
        const comment = await commentModel.findById(id);
         
        if (!comment) throw new ClientError("Comment not found", 404);

        return comment; 
    } catch (error) {
        throw error;
    }
}
module.exports = { createCommentService, getComments, 
                    getPostAndCommentService, getPostAndCommentOfUserService,
                    deleteCommentService, editCommentService,
                    getCommentsMapPostIdService, getCommentByIdService } ;  