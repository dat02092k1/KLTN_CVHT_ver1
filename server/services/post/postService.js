const postModel = require('../../models/posts/post.js');

const mongoose = require('mongoose');

var getPostListService = async (_class) => { 
    try {
        const post = await postModel.find( { class: _class } )
        if (!post) throw new Error("There're no posts in history");
        return post;
    } catch (error) {
        throw error;
    }
}

var createPostService = async (postDetails) => {
    try {
        const {
            username,
            title,
            content,
            _class       
        } = postDetails;

        const newPost = new postModel({
            username,
            title,
            content,
            _class
          });

        await newPost.save();   

        return newPost;
    } catch (error) {
        throw error;
    }
}

var updatePostService = async (id, postDetails) => {
    try {
        const objectId = mongoose.Types.ObjectId(id);
        console.log(objectId);
        const updatePost = await postModel.findByIdAndUpdate(objectId, postDetails, { new: true }); 
        if (!updatePost) {
            throw new Error(`No post found with id: ${id}`);
        }
        return updatePost;
    } catch (error) {
        throw error;
    }
}

module.exports = { getPostListService, createPostService, updatePostService } ;  