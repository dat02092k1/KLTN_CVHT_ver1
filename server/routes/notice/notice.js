var express = require('express');
var notice = require('../../controllers/notice/noticeController.js')
var userAuthenticate = require('../../middleware/authentication.js')
const router = express.Router();

// ANNOUNCEMENT APIS
router.post('/notice/add', userAuthenticate.isAdminAuthentication, notice.createNoticeController);
// post new notice
router.delete('/notice/delete/:id', userAuthenticate.isAdminAuthentication, notice.deleteNoticeController);
// delete notice
router.patch('/notice/edit/:id', userAuthenticate.isAdminAuthentication, notice.editNoticeController);
// edit notice
router.get('/notice/details/:id', userAuthenticate.isAdminAuthentication, notice.getNoticeDetailsController);
// details notice
router.get('/notice/get/:_class', userAuthenticate.isAdminAuthentication, notice.getNoticeController);
// get notice by class name

module.exports = router;       
