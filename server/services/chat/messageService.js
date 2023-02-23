const messageModel = require('../../models/Chat/message.js');

const mongoose = require('mongoose');

var getMessageSerivce = async (id) => { 
    try {
        const messages = await messageModel.find({
            conversationId: id
        });

        if (!messages) throw new Error('No messages found');

        return messages;
    } catch (error) {
        throw error;
    }
}

var createConversationService = async (req) => {
    try {
        const newMessage = new messageModel(req.body);

        await newMessage.save();

        return newMessage; 
    } catch (error) {
        throw error;
    }
}

module.exports = { getMessageSerivce, createConversationService } ;  