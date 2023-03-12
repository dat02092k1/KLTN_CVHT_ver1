const commentModel = require('../../models/comments/comment.js');
const postModel = require('../../models/posts/post.js');
const studentModel = require('../../models/students/studentsModel.js');

const { ClientError } = require('../error/error.js');

const mongoose = require('mongoose');

var createCommentService = async (id, userId, commentDetails) => {
    try {
        const postId = id;
        const {
            content
            } = commentDetails;
        console.log(id); 

        const getStudent = await studentModel.findById(userId);
         
        const username = getStudent.studentId; 

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
        console.log(username);

        const listComments = await commentModel.find({ username: username}); 

        if (!listComments) throw new ClientError("There're no comments at all", 404); 

        else return listComments;  
    } catch (error) {
        throw error;
    }
}

var getPostAndCommentService = async () => {
    
        // const list = {};
        // postModel.find((err, posts) => {
        //     if (err) throw new Error(err);
        //     else {
        //         commentModel.find({ postId: { $in: posts.map(post => post._id) }  })
        //                 .populate('postId')
        //                 .exec((err, comments) => {
        //                     if (err) throw new Error(err);
                            
        //                     else{ 
        //                          list.posts = posts;
        //                          list.comments = comments; 
        //                         console.log(list);
        //                         return list;
        //                     }
        //                 })
        //     }
        // })
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
        console.log('flag1')
        console.log(commentDetails);
        console.log('flag2')
        // const objectId = mongoose.Types.ObjectId(username);
        const updateComment = await commentModel.findByIdAndUpdate(id, commentDetails, { new: true }); 
        console.log(updateComment);
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
        console.log(comment);
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