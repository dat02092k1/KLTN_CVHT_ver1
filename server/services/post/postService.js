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
        console.log(postDetails.username);
        const username = postDetails.username;
        // const objectId = mongoose.Types.ObjectId(username);
        const updatePost = await postModel.findOneAndUpdate(username, postDetails, { new: true }); 
        if (!updatePost) {
            throw new Error(`No post found with id: ${id}`);
        }
        return updatePost;
    } catch (error) {
        throw error;
    }
}

var deletePostService = async (id) => {
    try {
        console.log(id);
        const deletePost = await postModel.findByIdAndDelete(id);

        if (deletePost) {
            return "Deleted successfully!";
        } else {
            throw new Error('Post is not found');
          }
    } catch (error) {
        throw error;
    }
}

module.exports = { getPostListService, createPostService, updatePostService, deletePostService } ;  