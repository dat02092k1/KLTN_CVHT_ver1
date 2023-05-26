const noticeModel = require("../../models/notices/notice.js");
const userModel = require("../../models/students/userModel.js");
const notiModel = require("../../models/notifications/notifications.js");
const email = require('../../utils/email.js');

const { ClientError } = require("../error/error.js");

const createNoticeService = async (req) => {
  try {
      const {
        userId,
        subject,
        message,
        _class
    } = req.body;             

    const getUsers = await userModel.find({ '_class.name': _class, role: 'student' });
 
    if (!getUsers) throw new ClientError('Users not found', 404);

    const notice = new noticeModel({
      userId, 
      subject,
      message,
      _class
    });
          
    await notice.save();

    
    // Send emails in parallel using Promise.all
    const html = `<div>
        ${message}
     </div>`; 
  
    const sendEmails = getUsers.forEach(function(student, index) {
      setTimeout(() => {
        return email(student.emailAddress, subject, html);     
      }, 1000 * index)});

    await Promise.all(sendEmails);
    
    const notification = getUsers.map((user) => ({
        userId: user._id,
        noticeId: notice._id,
        message: `Thông báo mới: ${notice.subject} trong lớp của bạn`,
      }));

      await notiModel.insertMany(notification);
    return notice;
  } catch (error) {
    throw error;
  }
};
 
const deleteNoticeService = async (id) => {
    try {
        const notiRelated = await notiModel.deleteMany({ noticeId: id });

        if (!notiRelated) throw new ClientError(`cound not find notification related to this post`, 404);

        const notice = await noticeModel.findByIdAndDelete(id);

        if (!notice) throw new ClientError('cant find notice', 404);

        return 'Delete notice successfully';
    } catch (error) {
        throw error;
    }
}

const editNoticeService = async (req) => {
    try {
        const noticeDetails = req.body;
        const id = req.params.id;
        console.log(noticeDetails); 

        const notice = await noticeModel.findByIdAndUpdate(id, noticeDetails, { new: true });

        if (!notice) throw new ClientError('cant find notice', 404);

        return notice;
    } catch (error) {
        throw error;
    }
}

const getNoticeDetailsService = async (id) => {
  try {
      const notice = await noticeModel.findById(id);

      if (!notice) throw new ClientError('cant find notice', 404);

      return notice;
  } catch (error) {
      throw error;
  }
}

const getNoticeService = async (req) => {
  try {
      const _class = req.params._class;

      const notices = await noticeModel.find({ _class: _class }).sort({updatedAt: -1});

      if (!notices) throw new ClientError('cant find notices', 404);

      return notices;
  } catch (error) {
      throw error;
  }
}
module.exports = {
    createNoticeService, deleteNoticeService,
    editNoticeService, getNoticeService,
    getNoticeDetailsService
};
