const studentsModel = require('../../models/students/studentsModel');
var studentModel = require('../../models/students/studentsModel');
const mongoose = require('mongoose');

var studentServiceGetAll = async (username, _class) => {
    try {
        console.log(username)
        const data = await studentModel.find({ class: _class });
        return data;
        
    } catch (error) {
        return false;
    } 
};         

var createStudentService = async (studentDetail) => {
    try {
        console.log(studentDetail)
        console.log(studentDetail.studentID);
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
            paidFee
          } = studentDetail;

          // check for existing
          var checkExisting = await studentModel.findOne( {studentId: studentDetail.studentId} );

          if (checkExisting) throw new Error("Student already exists");
           
          // create student
        const student = new studentModel(studentDetail); 


        await student.save();
        return student;
    } catch (error) {
        throw error;
    }
}

var updateStudentService = async (id, studentDetail) => {
    try {
        const objectId = mongoose.Types.ObjectId(id);
        console.log(objectId);
        console.log(studentDetail)
        const student = await studentModel.findByIdAndUpdate(objectId, studentDetail, { new: true }); 
        if (!student) {
            throw new Error(`No student found with id: ${id}`);
        }
        return student;
    } catch (error) {
        throw error;
    }
}

// var updateStudentService = async (req, res) => {
//     try {
//         console.log(req.body);
//         const student = await studentModel.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
//         if (!student) {
//             res.json({ message: "Update fail" });
//         }
        
//         res.status(200).json(student);
//     } catch (error) {
//         res.status(500).json({ message: "Server error ~ updateStudent" });
//     }
// }

var getStudentDetailService = async (id) => {
    try {
        if (!id) {
            throw new Error('ID is required');
          }
        
        const student = await studentsModel.findById(id);

        if (!student) {
            return 'Student not found';
          }

        return student;

    } catch (error) {
        throw error;
    }
}

var deleteStudentService = async (id) => {
    try {
        const deleteStudent = await studentsModel.findByIdAndDelete(id);

        if (deleteStudent) {
            return "Deleted successfully!";
        } else {
            throw new Error('student is not found');
          }
    } catch (error) {
        throw error;
    }
}
module.exports = { studentServiceGetAll, createStudentService, 
    updateStudentService, getStudentDetailService, deleteStudentService} ; 