var conversationService = require('../../services/chat/conversationService.js');     

var createConversationController = async (req, res) => { 
    try {
        
        var conversation = await conversationService.createConversationService(req, res);
        res.status(200).json({ success: true, conversation });
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: "create conversation failed" });
    }
}

var getConversationController = async (req, res) => {
    try {
        var conversations = await conversationService.getConversationService(req, res);
        res.status(200).json({ success: true, conversations });
    } catch (error) {
        res.status(500)
            .json({ success: false, message: "get conversation failed" });
    }
}

module.exports = {getConversationController, createConversationController } ;  