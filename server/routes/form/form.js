var express = require('express');
var formController = require('../../controllers/form/formController.js')  
var userAuthenticate = require('../../middleware/authentication.js')
const router = express.Router();

// Form APIS  
router.post('/form/add', userAuthenticate.verifyToken, formController.createFormController);
// get list of forms submit by type
router.get('/form/get/:class', userAuthenticate.isAdminAuthentication, formController.getFormsController);
// delete form 
router.delete('/form/delete/:id', userAuthenticate.roleAuthentication, formController.deleteFormController);
// edit form status
router.put('/form/update/:id', userAuthenticate.isAdminAuthentication, formController.updateFormController);
// get details form
router.get('/form/details/:id', userAuthenticate.isAdminAuthentication, formController.getDetailsFormController);
// get forms of users
router.get('/form/student/:id', userAuthenticate.roleAuthentication, formController.getFormsUserController);



module.exports = router;       
