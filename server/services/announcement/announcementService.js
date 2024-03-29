const announcementModel = require("../../models/announcements/announcement.js");
const userModel = require("../../models/students/userModel.js");

const logger = require("../../logger/logger.js");
const mongoose = require("mongoose");
const { ClientError } = require("../error/error.js");


var createAnnouncementService = async (req) => {
  try {
    const {
      user,
      title,
      fileUrl
    } = req.body;  

    const getUser = await userModel.findById(user);
    console.log(getUser)
    if (!getUser) throw new ClientError('User not found', 404);

    if (!fileUrl) throw new ClientError('File is required', 400);
    const announcement = new announcementModel({
      userId: user, 
      title,
      fileUrl
    });

    await announcement.save();

    return announcement;
  } catch (error) {
    throw error;
  }
};
 
var getAnnouncementService = async () => {
    try {
      const announcement = await announcementModel.find().sort({ updatedAt: -1});
      
      if (!announcement) throw new ClientError('announcement not found', 404);
  
      return announcement;
    } catch (error) {
      throw error;
    }
  };

var deleteAnnouncementService = async (id) => {
    try {
      const announcement = await announcementModel.findByIdAndDelete(id);     
      
      if (!announcement) throw new ClientError('announcement can not be deleted', 404);
  
      return 'delete announcement successfully';  
    } catch (error) {
      throw error;
    }              
  };

  var editAnnouncementService = async (id, details) => {
    try {
      const announcement = await announcementModel.findByIdAndUpdate(id, details, { new: true });     
      
      if (!announcement) throw new ClientError('announcement not found', 404);
  
      return announcement;   
    } catch (error) {
      throw error;
    }              
  };

  var getSpecifiedService = async (id) => {
    try {
      const announcement = await announcementModel.findById(id);     
      
      if (!announcement) throw new ClientError('announcement not found', 404);
  
      return announcement;   
    } catch (error) {
      throw error;
    }              
  };
module.exports = {
    createAnnouncementService, getAnnouncementService,
    deleteAnnouncementService, editAnnouncementService,
    getSpecifiedService
};
