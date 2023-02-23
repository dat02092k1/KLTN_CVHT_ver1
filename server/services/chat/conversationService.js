const conversationModel = require('../../models/Chat/conversation.js');

const mongoose = require('mongoose');

var createConversationService = async (req, res) => { 
    try {
        const newConversation = new conversationModel({
            members: [req.body.senderId, req.body.receiverId],
        });

        await newConversation.save();

        return newConversation;
    } catch (error) {
        throw error;
    }
}

var getConversationService = async (req, res) => {
    try {
        const listConversation = await conversationModel.find({
            members: {
                $in: [req.params.username]
            }
        });

        if (!listConversation) throw new Error("can't find conversation")

        return listConversation;
    } catch (error) {
        throw error;  
    }
}


module.exports = { getConversationService, createConversationService } ;  