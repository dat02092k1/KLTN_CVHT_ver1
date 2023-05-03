const postModel = require("../../models/posts/post.js");
const userModel = require("../../models/students/userModel.js");
const notiModel = require("../../models/notifications/notifications.js");
const commentModel = require("../../models/comments/comment.js");

const logger = require("../../logger/logger.js");
const mongoose = require("mongoose");
const { ClientError } = require("../error/error.js");

var getPostListService = async (req) => {
  try {
    const _class = req.params.class; 
 
    const post = await postModel.find({ _class: _class });
    if (!post) throw new ClientError("There're no posts", 404);
    return post.reverse();
  } catch (error) {
    throw error;
  }
};

var createPostService = async (postDetails) => {
  try {
    const {
      user,
      title,
      content,
      _class,
      imageUrl,
    } = postDetails;

    console.log(postDetails);

    const getUser = await userModel.findById(user);

    const username = getUser.userId;
 
    const newPost = new postModel({
      userId: user,
      username,
      title,
      content,
      _class,
      imageUrl,
    });

    await newPost.save();

    const users = await userModel.find({
      _id: { $ne: newPost.userId },
      '_class.name': newPost._class,
    });

    const notification = users.map((user) => ({
      userId: user._id,
      postId: newPost._id,
      message: `New post: ${newPost.title} in your class`,
    }));

    await notiModel.insertMany(notification);

    return newPost;
  } catch (error) {
    throw error;
  }
};

var updatePostService = async (id, postDetails) => {
  try {
    // const objectId = mongoose.Types.ObjectId(username);
    const updatePost = await postModel.findByIdAndUpdate(id, postDetails, {
      new: true,
    });
    if (!updatePost) {
      throw new ClientError(`No post found with id: ${id}`, 404);
    }
    return updatePost;
  } catch (error) {
    throw error;
  }
};

var deletePostService = async (id) => {
  try {
    const commentRelated = await commentModel.deleteMany({ postId: id });

    if (!commentRelated)
      throw new ClientError(`cound not find comment related to this post`, 404);

    const notiRelated = await notiModel.deleteMany({ postId: id });

    if (!notiRelated)
      throw new ClientError(
        `cound not find notification related to this post`,
        404
      );

    const deletePost = await postModel.findByIdAndDelete(id);

    console.log(deletePost);
    if (deletePost) {
      return "Deleted successfully!";
    } else {
      throw new ClientError("Post is not found", 404);
    }
  } catch (error) {
    throw error;
  }
};

var listPostsPerPageService = async (req) => {
  try {
    const _class = req.params.class; 
      
    const page = req.query.page || 1;
    console.log(page);
    const perPage = 5;
    const skip = (page - 1) * perPage;    
    
    const totalPosts = await postModel.countDocuments({ _class: _class });
    const totalPages = Math.ceil(totalPosts / 5);

    const posts = await postModel
      .find({ _class: _class })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage);

    if (!posts) throw new ClientError("There're no posts", 404);
 
    return {
      totalPages: totalPages,
      posts: posts,
    };

  } catch (error) {
    throw error;
  }
};

module.exports = {
  getPostListService,
  createPostService,
  updatePostService,
  deletePostService,
  listPostsPerPageService,
};
