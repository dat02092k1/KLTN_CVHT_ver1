const commentModel = require('../../models/comments/comment.js');
const postModel = require('../../models/posts/post.js');

const mongoose = require('mongoose');

var createCommentService = async (id, commentDetails) => {
    try {
        const postId = id;
        const {
            username,
            content
            } = commentDetails;
        console.log(username); 

        const newComment = new commentModel({
            postId,
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

        if (!listComments) throw new Error("There're no comments at all"); 

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
module.exports = { createCommentService, getComments, getPostAndCommentService } ;  