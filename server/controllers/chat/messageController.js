var messageService = require('../../services/chat/messageService.js');     

var getMessageController = async (req, res) => {
    try {
        var messages = await messageService.getMessageSerivce(req.params.conversationId);
        res.status(200).json({ success: true, messages });
    } catch (error) {
        res.status(500)
            .json({ success: false, message: "get message failed" });
    }
}

var createMessageController = async (req, res) => { 
    try {   
        var message = await messageService.createConversationService(req);
        res.status(200).json({ success: true, message });
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: "create message failed" });
    }
}

var getMessageLimitController = async (req, res) => {
    try {
        var messages = await messageService.getMessageLimitService(req.params.conversationId);
        res.status(200).json({ success: true, messages });
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: "get message failed" });
    }
}

var loadMessageController = async (req, res) => {
    try {
        var messages = await messageService.loadMessageService(req);
        res.status(200).json({ success: true, messages });
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: "get message failed" });
    }
}

module.exports = { getMessageController, createMessageController, 
    getMessageLimitController, loadMessageController } ;  