var studentModel = require('../../models/students/studentsModel');

var studentServiceGetAll = async (_class) => {
    try {
        const data = await studentModel.find({ class: _class });
        return data;
    } catch (error) {
        return false;
    } 
};         

var createStudentService = async (studentDetail) => {
    try {
        // Destructure student detail
        const {
            studentId,
            name,
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
        const student = await studentModel.findByIdAndUpdate(id, studentDetail); 
        return student;
    } catch (error) {
        throw error;
    }
}

module.exports = { studentServiceGetAll, createStudentService, updateStudentService} ; 