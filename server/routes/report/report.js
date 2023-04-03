var express = require('express');
var report = require('../../controllers/report/reportController.js')
var userAuthenticate = require('../../middleware/authentication.js')
var upload = require('../../uploads/multer.js').upload; 

const router = express.Router();

// Report for manager
router.post('/report/create/:userId', userAuthenticate.isAdminAuthentication, upload.array('docs', 3), report.createReport);
// create report
router.delete('/report/delete/:id', userAuthenticate.isAdminAuthentication, report.deleteReport);
// delete report
router.get('/report/details/:id', userAuthenticate.isAdminAuthentication, report.getDetailsReport);
// get details report
router.get('/report/list', userAuthenticate.isAdminAuthentication, report.getListReports);
// get list reports 
router.put('/report/edit/:id', userAuthenticate.isAdminAuthentication, report.editReport);
// edit report
router.get('/reports/:userId', userAuthenticate.isAdminAuthentication, report.getReports);

module.exports = router;       
