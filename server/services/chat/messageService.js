const messageModel = require("../../models/Chat/message.js");

const mongoose = require("mongoose");

var getMessageSerivce = async (id) => {
  try {
    const messages = await messageModel.find({
      conversationId: id,
    });

    if (!messages) throw new Error("No messages found");

    return messages;
  } catch (error) {
    throw error;
  }
};

var createConversationService = async (req) => {
  try {
    const newMessage = new messageModel(req.body);

    await newMessage.save();

    return newMessage;
  } catch (error) {
    throw error;
  }
};

var getMessageLimitService = async (conversationId) => {
  try {
    const messages = await messageModel
      .find({ conversationId: conversationId })
      .sort({ createdAt: -1 })
      .limit(10);

    if (!messages) throw new Error("cant find messages");

    return messages.reverse();
  } catch (error) {
    throw error;
  }
};

var loadMessageService = async (req) => {
  try {
     

    const conversationId = req.query.conversationId;
    const page = req.query.page;
    const pageSize = req.query.pageSize || 10;
    const skip = (page - 1) * pageSize;
    console.log(page); 
    console.log(pageSize);   
    console.log(skip); 

    const messages = await messageModel.find({ conversationId: conversationId })
                                   .sort({ createdAt: -1 })
                                   .skip(skip)
                                   .limit(pageSize);

    
    

    if (!messages) throw new Error('No messages found');

    return messages.reverse();  
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getMessageSerivce,
  createConversationService,
  getMessageLimitService,
  loadMessageService,
};
