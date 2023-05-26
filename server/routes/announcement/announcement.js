var express = require('express');
var announcementController = require('../../controllers/announcement/announcementController.js')
var userAuthenticate = require('../../middleware/authentication.js')
const router = express.Router();

// ANNOUNCEMENT APIS
router.post('/announcement/add', userAuthenticate.isAdminAuthentication, announcementController.createAnnouncementController);
// get list of announcements
router.get('/announcement/get', userAuthenticate.verifyToken, announcementController.getAnnouncementController);
// delete announcement
router.delete('/announcement/delete/:id', userAuthenticate.isAdminAuthentication, announcementController.deleteAnnouncementController);
// edit announcement
router.put('/announcement/put/:id', userAuthenticate.isAdminAuthentication, announcementController.editAnnouncementController);
// get specified announcement
router.get('/announcement/get/:id', userAuthenticate.isAdminAuthentication, announcementController.getSpecifiedController);


module.exports = router;       
