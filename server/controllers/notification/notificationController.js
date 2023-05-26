var notificationService = require('../../services/notification/notificationService.js');     
const { ClientError } = require('../../services/error/error.js');

var getNotificationsController = async (req, res) => { 
    try {
          
        var notifications = await notificationService.getNotificationsService(req.user.id);
        res.status(200).json({ success: true, notifications });
    } catch (error) {
        console.log(error);
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var readNotificationsController = async (req, res) => {
    try {
        var notification = await notificationService.readNotificationsService(req.params.id);
        res.status(200).json({ success: true, notification });
    } catch (error) {
        console.log(error);
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}
module.exports = { getNotificationsController, readNotificationsController } ;  