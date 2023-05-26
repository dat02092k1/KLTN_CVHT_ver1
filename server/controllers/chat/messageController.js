var messageService = require('../../services/chat/messageService.js');     
const { ClientError } = require('../../services/error/error.js');
 
var getMessageController = async (req, res) => {
    try {
        var messages = await messageService.getMessageSerivce(req.params.conversationId);
        res.status(200).json({ success: true, messages });
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var createMessageController = async (req, res) => { 
    try {   
        var message = await messageService.createConversationService(req);
        res.status(200).json({ success: true, message });
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var getMessageLimitController = async (req, res) => {
    try {
        var messages = await messageService.getMessageLimitService(req.params.conversationId);
        res.status(200).json({ success: true, messages });
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var loadMessageController = async (req, res) => {
    try {
        var messages = await messageService.loadMessageService(req);
        res.status(200).json({ success: true, messages });
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

module.exports = { getMessageController, createMessageController, 
    getMessageLimitController, loadMessageController } ;  