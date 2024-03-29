var express = require('express');
var userAuthenticate = require('../../middleware/authentication.js')
var conversation = require('../../controllers/chat/conversationController.js')

const router = express.Router();

// get conversation
router.get('/conversation/:username', conversation.getConversationController);
// create conversation
router.post('/conversation/create', userAuthenticate.verifyToken, conversation.createConversationController);
// handle conversation
router.post('/conversation/handle', userAuthenticate.verifyToken, conversation.handleConversationController);




module.exports = router;       
