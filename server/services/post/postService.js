const postModel = require('../../models/posts/post.js');
const userModel = require('../../models/students/studentsModel.js');

const commentModel = require('../../models/comments/comment.js');

const logger = require('../../logger/logger.js')
const mongoose = require('mongoose');
const { ClientError } = require('../error/error.js');

var getPostListService = async (_class) => { 
    try {
        const post = await postModel.find( { class: _class } ); 
        if (!post) throw new ClientError("There're no posts", 404);
        return post.reverse();
    } catch (error) {
        throw error;
    }
}

var createPostService = async (postDetails) => {
    try {
        const {
            user,
            title,
            content,
            // _class,
            imageUrl        
        } = postDetails;

         
        console.log(postDetails);

        const getUser = await userModel.findById(user);  

        console.log(getUser); 
        const username = getUser.studentId; 
        const _class = getUser._class;
           
        
        const newPost = new postModel({
            userId: user,
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
        console.log('flag delete')

        const commentRelated = await commentModel.deleteMany({ postId: id });

        if (!commentRelated) throw new ClientError(`cound not find comment related to this post`, 404); 

        const deletePost = await postModel.findByIdAndDelete(id);

        console.log(deletePost);
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
         
        const listPost = await postModel.find({ username: username}); 

        if (!listPost) throw new ClientError("There're no posts", 404); 

        else return listPost;  
    } catch (error) {
        throw error;
    }
}

module.exports = { getPostListService, createPostService, 
    updatePostService, deletePostService, listPostOfUser } ;  