const conversationModel = require("../../models/Chat/conversation.js");
const messageModel = require("../../models/Chat/message.js");

const { ClientError } = require("../error/error.js");
const mongoose = require("mongoose");

var createConversationService = async (req, res) => {
  try {
    const newConversation = new conversationModel({
      members: [req.body.senderId, req.body.receiverId],
    });

    const checkExisted = await conversationModel.findOne({
      members: { $all: [req.body.senderId, req.body.receiverId] },
    });

    if (checkExisted) throw new ClientError(checkExisted, 409);

    await newConversation.save();

    return newConversation;
  } catch (error) {
    throw error;
  }
};

const getConversationService = async (req, res) => {
  try {
    const conversations = await conversationModel.find({
      members: {
        $in: [req.params.username],
      },
    });

    const conversationsWithLatestMessages = await Promise.all(
      conversations.map(async conversation => {
        // Find all messages belonging to this conversation and sort them by createdAt in descending order
        const messages = await messageModel.find({ conversationId: conversation._id })
          .sort({ createdAt: 'desc' })
          .exec();
         
        // Get the message with the closest createdAt time to the current time
        const latestMessage = messages.find(message => message.createdAt <= new Date());
         
          // Return the conversation with the latest message as a new object
          return {
            ...conversation.toObject(),
            latestMessageCreatedAt: latestMessage ? latestMessage.createdAt : null
          };
      })
    )
     
    // Sort conversations by latestMessageCreatedAt in descending order
    const sortedConversations = conversationsWithLatestMessages.sort((a, b) => b.latestMessageCreatedAt - a.latestMessageCreatedAt);

    return sortedConversations;
  } catch (error) {
    throw error;
  }
};

var handleConversationService = async (req, res) => {
  try {
    const checkConversation = await conversationModel.findOne({
      members: { $all: [req.body.senderId, req.body.receiverId] },
    });

    if (checkConversation) {
        return checkConversation;
    } else {
      const newConversation = new conversationModel({
        members: [req.body.senderId, req.body.receiverId],
      });

      await newConversation.save();

      return newConversation;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { getConversationService, createConversationService, handleConversationService };