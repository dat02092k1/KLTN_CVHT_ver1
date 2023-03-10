const postModel = require('../../models/posts/post.js');

const mongoose = require('mongoose');
const { ClientError } = require('../error/error.js');

var getPostListService = async (_class) => { 
    try {
        const post = await postModel.find( { class: _class } ); 
        if (!post) throw new ClientError("There're no posts in history", 404);
        return post.reverse();
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
            _class,
            imageUrl        
        } = postDetails;

        console.log(postDetails);
        const newPost = new postModel({
            username,
            title,
            content,
            _class,
            imageUrl
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
        const updatePost = await postModel.findByIdAndUpdate(id, postDetails, { new: true }); 
        if (!updatePost) {
            throw new ClientError(`No post found with id: ${id}`, 404);
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
            throw new ClientError('Post is not found', 404);
          }
    } catch (error) {
        throw error;
    }
}

var listPostOfUser = async (username) => {
    try {
        console.log('service');
        const listPost = await postModel.find({ username: username}); 

        if (!listPost) throw new ClientError("There're no posts", 404); 

        else return listPost;  
    } catch (error) {
        throw error;
    }
}

module.exports = { getPostListService, createPostService, 
    updatePostService, deletePostService, listPostOfUser } ;  