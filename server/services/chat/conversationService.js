const conversationModel = require("../../models/Chat/conversation.js");
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

    console.log(checkExisted);

    if (checkExisted) throw new ClientError(checkExisted, 409);

    await newConversation.save();

    return newConversation;
  } catch (error) {
    throw error;
  }
};

var getConversationService = async (req, res) => {
  try {
    const listConversation = await conversationModel.find({
      members: {
        $in: [req.params.username],
      },
    })
    .sort({ createdAt: -1 });

    if (!listConversation)
      throw new ClientError("can't find conversation", 404);

    return listConversation;
  } catch (error) {
    throw error;
  }
};

var handleConversationService = async (req, res) => {
  try {
    const checkConversation = await conversationModel.findOne({
      members: { $all: [req.body.senderId, req.body.receiverId] },
    });
    console.log('handle');
    console.log(checkConversation);

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
