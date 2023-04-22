var express = require('express');
var formController = require('../../controllers/form/formController.js')  
var userAuthenticate = require('../../middleware/authentication.js')
const router = express.Router();

// Form APIS  
// add form
router.post('/form/add', userAuthenticate.verifyToken, formController.createFormController);
// get list of forms submit by type
router.get('/form/get/:class', userAuthenticate.isAdminAuthentication, formController.getFormsController);
// delete form 
router.delete('/form/delete/:id', userAuthenticate.onlyOwner, formController.deleteFormController);
// edit form status
router.put('/form/update/:id', userAuthenticate.verifyToken, formController.updateFormController);
// get details form
router.get('/form/details/:id', userAuthenticate.verifyToken, formController.getDetailsFormController);
// get forms of users
router.get('/form/student/:id', userAuthenticate.verifyToken, formController.getFormsUserController);
// get forms by type
router.get('/form/get-type/:id', userAuthenticate.roleAuthentication, formController.getFormsByType);
// get forms rest
router.get('/form/get-rest/:id', userAuthenticate.roleAuthentication, formController.getFormsRest);


module.exports = router;       
