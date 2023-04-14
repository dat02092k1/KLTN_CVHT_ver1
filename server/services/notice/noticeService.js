const noticeModel = require("../../models/notices/notice.js");
const userModel = require("../../models/students/studentsModel.js");
const email = require('../../utils/email.js');

const { ClientError } = require("../error/error.js");

const createNoticeService = async (req) => {
  try {
     
    console.log(req.query); 
    const {
        userId,
        subject,
        message,
        _class
    } = req.body;             
    console.log(_class);

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
    const sendEmails = getUsers.map(student => {
        console.log(student.emailAddress);
        return email(student.emailAddress, subject, html);
    });

    await Promise.all(sendEmails);
    
    return notice;
  } catch (error) {
    throw error;
  }
};
 
const deleteNoticeService = async (id) => {
    try {
        console.log(id);
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
