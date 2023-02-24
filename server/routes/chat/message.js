var express = require('express');
var userAuthenticate = require('../../middleware/authentication.js')
var message = require('../../controllers/chat/messageController.js')

const router = express.Router();

// get messages
router.get('/message/:conversationId', userAuthenticate.verifyToken, message.getMessageController);
// create message
router.post('/message/create', userAuthenticate.verifyToken, message.createMessageController);



module.exports = router;       
