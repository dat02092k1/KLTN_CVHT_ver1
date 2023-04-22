var userModel = require("../../models/students/userModel.js");
var postModel = require("../../models/posts/post.js");
var commentModel = require("../../models/comments/comment.js");
var courseModel = require("../../models/score/course.js");
var taskModel = require("../../models/task/taskModel.js");
var formModel = require("../../models/forms/form.js");
var reportModel = require("../../models/reports/report.js");
var conversationModel = require("../../models/Chat/conversation.js");

const bcrypt = require("bcryptjs");
const SALT_ROUNDS = 10;
const { ClientError } = require('../error/error.js');

const mongoose = require("mongoose");

var studentServiceGetAll = async (_class) => {
  try {
     
    const data = await userModel.find({ '_class.name': _class, role: "student" });
    console.log(data); 
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
      userId,
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

    console.log(_class); 
    const hashPassword = await bcrypt.hashSync(password, SALT_ROUNDS);

    // mã hóa password
    studentDetail.password = hashPassword;
 
    var checkExisting = await userModel.findOne({
      $or: [
        { userId: studentDetail.studentId },
        { emailAddress: studentDetail.emailAddress },
        { phone: studentDetail.phone },
      ]
    });
    
    console.log(checkExisting);
    if (checkExisting) throw new ClientError("Student already exists", 404);

    // create student
    const student = new userModel(studentDetail);

    await student.save();
    return student;
  } catch (error) {
    throw error;
  }
};

var updateStudentService = async (id, studentDetail, role) => {
  try {
     
    const objectId = mongoose.Types.ObjectId(id);
     
    const { studentId } = studentDetail;
    console.log(studentDetail);
    
    const findUser = await userModel.findById(id);

    if (findUser.role === 'manager') {
      const user = await userModel.findByIdAndUpdate(objectId, studentDetail);

      if (!user) throw new ClientError('cant find user with id ' + objectId, 404);

      return user;
    }

     const formattedClass = studentDetail._class?.map(c => ({ name: c.name }));
     console.log('class flag')
    const student = await userModel.findByIdAndUpdate(
      objectId,
      { ...studentDetail, _class: formattedClass },
      // { new: true }
    );
       
    if (!student) { 
      throw new ClientError(`No student found with id: ${id}`, 404);
    }
    
    if (
      student.userId !== studentId
    ) {
      console.log("false");
      const conversationFilter = { members: { $elemMatch: { $eq: student.userId } } };

      const conversations = await conversationModel.find(conversationFilter);

      for (const conversation of conversations) {
        const index = conversation.members.indexOf(student.userId);
        conversation.members[index] = studentId;
        await conversation.save();
      }
      
      await Promise.all([
        courseModel.updateMany({ student: id }, { $set: { studentId: studentId } }),
        postModel.updateMany({ userId: id }, { $set: { username: studentId } }),
        commentModel.updateMany({ userId: id }, { $set: { username: studentId } }),
        taskModel.updateMany({ student: id }, { $set: { studentId: studentId } }),
      ]);

    } else {
      console.log("true");
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

    const student = await userModel.findById(id);

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
    const deleteStudent = await userModel.findByIdAndDelete(id);

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
    const getName = await userModel.find({ '_class.name': _class }, "userId");
    console.log(_class);
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
    userModel.find({ userId: { $in: data.map(item => item.userId) } }, { userId: 1 }),
    userModel.find({ emailAddress: { $in: data.map(item => item.emailAddress) } }, { emailAddress: 1 })
  ]);
   
  const duplicateEmails = data.filter(item => existingUsers[1].some(user => user.emailAddress === item.emailAddress));
  const duplicateUserIds = data.filter(item => existingUsers[0].some(user => user.userId === item.userId));

  if (duplicateEmails.length > 0 || duplicateUserIds.length > 0) {
    const errors = {
      duplicateEmails,
      duplicateUserIds
    };

    throw new ClientError(`duplicate ${errors}`, 404); 
}

  const students = [];
  const consultants = [];

  for (const row of data) {
    const password = row.password;
    const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const commonProps = {
      userId: row.userId,
      password: hashPassword,
      name: row.name,
      role: row.role,
      birthdate: row.birthdate,
      address: row.address,
      emailAddress: row.emailAddress,
      phone: row.phone,
      gender: row.gender
      };  

      const _class = row.class.split(',');
      console.log(_class);

      if (row.role === 'student') {
        const student = new userModel({
          ...commonProps,
          _class: _class.map(className => ({ name: className.trim() }))
        });

        students.push(student);
        console.log(students);
      }
      else if (row.role === 'consultant') {
        const consultant = new userModel({
          ...commonProps,
          _class: _class.map(className => ({ name: className.trim() }))
        });
        consultants.push(consultant);
        console.log(consultants);
      }
    }
    return Promise.all([
      userModel.insertMany(students),
      userModel.insertMany(consultants)
    ]);
  }
  catch (error) {
    throw error;
  }
};

var getStudentStatusService = async (req) => {
  try {
    const _class = req.params.class;
                
    const status = req.query.status; 

    console.log(_class, req.query.status);
    const students = await userModel.find({ '_class.name': _class, status: status, role: "student" });

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

    const student = await userModel.findOne({ userId: username});

    if (!student) {
      throw new ClientError(`No student found with id: ${username}`, 404);
    }

    return student;
  } catch (error) {
    throw error;
  }
};

var getStudentsInClassService = async (id) => {
  try {
    if (!id) {
      throw new ClientError("id is required", 400);
    }

    const student = await userModel.findById(id);

    if (!student) {
      throw new ClientError(`No student found with id: ${id}`, 404);
    }

    const classes = student._class.map((item) => item.name);

    const students = await userModel.find({ '_class.name': { $in: classes },  _id: { $ne: id } });

    return students;
  } catch (error) {
    throw error;
  }
};

var getAllClassService = async () => {
  try {
   const res = await userModel.find({ role: 'consultant'})
    if (!res) throw new Error;

    const classes = res.map((user) => {
      return user._class;
    })
    
   return classes.flat();
  } catch (error) {
    throw error;
  }
};

var getUsersInClassService = async (_class) => {
  try {
     
    const data = await userModel.find({ '_class.name': _class });
    console.log(data); 
    if (!data) throw new ClientError('data not found', 404)

    return data;
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
  getStudentDetailsService,
  getStudentsInClassService,
  getAllClassService,
  getUsersInClassService
};
