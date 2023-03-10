var conversationService = require('../../services/chat/conversationService.js');     
const { ClientError } = require('../../services/error/error.js');

var createConversationController = async (req, res) => { 
    try {
        
        var conversation = await conversationService.createConversationService(req, res);
        res.status(200).json({ success: true, conversation });
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var getConversationController = async (req, res) => {
    try {
        var conversations = await conversationService.getConversationService(req, res);
        res.status(200).json({ success: true, conversations });
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

module.exports = {getConversationController, createConversationController } ;  