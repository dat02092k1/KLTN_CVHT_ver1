const studentsModel = require("../../models/students/studentsModel");
var studentModel = require("../../models/students/studentsModel");
var postModel = require("../../models/posts/post.js");
var commentModel = require("../../models/comments/comment.js");
var taskModel = require("../../models/task/taskModel.js");
var formModel = require("../../models/forms/form.js");
var reportModel = require("../../models/reports/report.js");
var conversationModel = require("../../models/Chat/conversation.js");

const bcrypt = require("bcryptjs");
const SALT_ROUNDS = 10;
const { ClientError } = require('../error/error.js');

const mongoose = require("mongoose");

var studentServiceGetAll = async (username, _class) => {
  try {
     
    const data = await studentModel.find({ _class: _class, role: "student" });

    if (!data) throw new ClientError('data not found', 404)

    return data;
  } catch (error) {
    throw error;
  }
};

var createStudentService = async (studentDetail) => {
  try {
    // Destructure student detail
    const {
      studentId,
      password,
      name,
      role,
      birthdate,
      address,
      emailAddress,
      phone,
      gender,
      total_creadits,
      status,
      _class,
      gpa,
      paidFee,
    } = studentDetail;

    const hashPassword = await bcrypt.hashSync(password, SALT_ROUNDS);

    // mã hóa password
    studentDetail.password = hashPassword;

    var checkExisting = await studentModel.findOne({
      $or: [
        { studentId: studentDetail.studentId },
        { emailAddress: studentDetail.emailAddress },
        { phone: studentDetail.phone },
      ]
    });
    
    console.log(checkExisting);
    if (checkExisting) throw new ClientError("Student already exists", 404);

    // create student
    const student = new studentModel(studentDetail);

    await student.save();
    return student;
  } catch (error) {
    throw error;
  }
};

var updateStudentService = async (id, studentDetail, role) => {
  try {
    const objectId = mongoose.Types.ObjectId(id);
    
    const { studentId, _class } = studentDetail;

    const student = await studentModel.findByIdAndUpdate(
      objectId,
      studentDetail,
      { new: true }
    );

    if (!student) {
      
      throw new ClientError(`No student found with id: ${id}`, 404);
    }

    if (student.studentId !== studentId || student._class !== _class) {
      await postModel.updateMany({
        userId: id
      }, {
        $set: {
          username: student.studentId,
          _class: student._class
        }
      });
  
      await commentModel.updateMany({
        userId: id
      }, {
        $set: {
          username: student.studentId
        }
      })

      await taskModel.updateMany(
        { "assignedStudents.student": student._id },
        { $set: { "assignedStudents.$.studentId": student.studentId } }
      );

      await formModel.updateMany({
        student: id
      }, {
        $set: {
          username: student.studentId,
          _class: student._class           
        }
      });

      await reportModel.updateMany({
        userId: id
      }, {
        $set: {
          username: student.studentId,
        }
      });
      
  }
  

    return student;
  } catch (error) {
    throw error;
  }
};

var getStudentDetailService = async (id) => {
  try {
    if (!id) {
      throw new ClientError("ID is required", 404);
    }

    const student = await studentsModel.findById(id);

    if (!student) {
      throw new ClientError(`No student found with id: ${id}`, 404);
    }

    return student;
  } catch (error) {
    throw error;
  }
};

var deleteStudentService = async (id) => {
  try {
    const deleteStudent = await studentsModel.findByIdAndDelete(id);

    if (deleteStudent) {
      return "Deleted successfully!";
    } else {
      throw new ClientError(`No student found with id: ${id}`, 404);
    }
  } catch (error) {
    throw error;
  }
};

var getNameStudentService = async (_class) => {
  try {
    const getName = await studentModel.find({ class: _class }, "studentId");

    if (!getName) throw new ClientError(`Cant find students of class ${_class}`, 404);

    return getName;
  } catch (error) {
    throw error;
  }
};

var uploadStudentsService = async (req) => {
  try {
    const data = req.data;
    
    // Kiểm tra xem email và tên người dùng đã tồn tại trong cơ sở dữ liệu hay chưa
   const existingUsers = await Promise.all([
    studentModel.find({ studentId: { $in: data.map(item => item.studentId) } }, { studentId: 1 }),
    studentModel.find({ emailAddress: { $in: data.map(item => item.emailAddress) } }, { emailAddress: 1 })
  ]);
   
  const duplicateEmails = data.filter(item => existingUsers[1].some(user => user.emailAddress === item.emailAddress));
  const duplicateUsernames = data.filter(item => existingUsers[0].some(user => user.studentId === item.studentId));

  if (duplicateEmails.length > 0 || duplicateUsernames.length > 0) {
    const errors = {
      duplicateEmails,
      duplicateUsernames
    };

    throw new ClientError(`duplicate ${errors}`, 404); 
}

    const newStudents = await studentModel.insertMany(data);
    
    return newStudents;
  } catch (error) {
    throw error;
  }
};

var getStudentStatusService = async (req) => {
  try {
    const _class = req.params.class;
                
    const status = req.query.status; 

    console.log(_class, req.query.status);
    const students = await studentModel.find({ _class: _class, status: status, role: "student" });

    if (!students) throw new ClientError(`Cant find students`, 404);

    return students;  
  } catch (error) {
    throw error;
  }
};

var getStudentDetailsService = async (username) => {
  try {
    if (!username) {
      throw new ClientError("username is required", 404);
    }

    const student = await studentsModel.findOne({ studentId: username});

    if (!student) {
      throw new ClientError(`No student found with id: ${username}`, 404);
    }

    return student;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  studentServiceGetAll,
  createStudentService,
  updateStudentService,
  getStudentDetailService,
  deleteStudentService,
  getNameStudentService,
  uploadStudentsService,
  getStudentStatusService,
  getStudentDetailsService
};
