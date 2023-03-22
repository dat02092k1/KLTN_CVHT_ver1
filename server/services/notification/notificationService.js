const postModel = require('../../models/posts/post.js');
const userModel = require('../../models/students/studentsModel.js');
const notificationModel = require('../../models/notifications/notifications.js');

const logger = require('../../logger/logger.js')
const mongoose = require('mongoose');
const { ClientError } = require('../error/error.js');

var getNotificationsService = async (id) => { 
    try {
         
        const notifications = await notificationModel.find({
            userId: id,
            isRead: false
        }).populate('postId');

        if (!notifications) throw new ClientError(`No notifications found`, 404);

        return notifications;
    } catch (error) {
        throw error;
    }
}

var readNotificationsService = async (id) => {
    try {
        console.log('flag noti');
        const notification = await notificationModel.findByIdAndUpdate(
            id,
            { isRead: true },
            { new: true }
          );
      
          if (!notification) throw new ClientError('No notification found', 404);

          return notification;
    } catch (error) {
        throw error;
    }
}
module.exports = { getNotificationsService, readNotificationsService } ;  