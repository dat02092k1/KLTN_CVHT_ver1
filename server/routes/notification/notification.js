var express = require('express');
var notificationController = require('../../controllers/notification/notificationController.js')
var userAuthenticate = require('../../middleware/authentication.js')
const router = express.Router();

// get notifications
router.get('/get/notifications', userAuthenticate.verifyToken, notificationController.getNotificationsController);
// read notifications
router.patch('/read/notifications/:id', userAuthenticate.verifyToken, notificationController.readNotificationsController);



module.exports = router;       
