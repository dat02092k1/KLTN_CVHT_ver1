const scoreModel = require("../../models/score/score.js");
const courseModel = require("../../models/score/course.js");

const studentsModel = require("../../models/students/studentsModel.js");

const mongoose = require("mongoose");

var getScoreService = async (studentId) => {
  try {                
    const student = await studentsModel.findById(studentId);  

    if (!student) throw new Error(`Student not found`);

    const result = await courseModel.aggregate([
        { $match: { student: student._id } },
        {
            $group: {
                _id: null,
                totalScore: { $sum: { $multiply: ["$GPA", "$total_credits"] } },
                totalCredits: { $sum: "$total_credits" },
              },
        },
        {
            $project: {    
                _id: 0,
                CPA: { $divide: ["$totalScore", "$totalCredits"] },
                total_credits: "$totalCredits"
              },
      
        }
    ]);

    const cpaValue = result[0].CPA;
    const totalCredits = result[0].total_credits;
    const status =
      cpaValue < 3.0
        ? "Cảnh báo học vụ"
        : cpaValue > 3.2
        ? "Khen thưởng"          
        : "Không"; 

      student.CPA = cpaValue;

      student.status = status;

      student.total_creadits = totalCredits;

      await student.save();

    // const newScore = new scoreModel({
    //         student: studentId,
    //         CPA: cpaValue,
    //         status: status,
    //       });
    // await newScore.save();

    return student; 
  } catch (error) {
    throw error;
  }
};

var getClassScoreService = async (_class) => {
  try {
    const students = await studentsModel.find({ _class: _class });

     
    const studentIds = students.map((student) => student._id);

     console.log(studentIds);

    const result = await scoreModel.aggregate([
      {
        $match: { student: { $in: studentIds } }, // Lọc các score có studentId nằm trong danh sách studentIds
      },
      {
        $group: {
          _id: null,
          totalScore: { $sum: { $multiply: ["$GPA", "$total_credits"] } },
          totalCredits: { $sum: "$total_credits" },
        },
      },
      {
        $project: {
          _id: 0,
          CPA: { $divide: ["$totalScore", "$totalCredits"] },
        },
      }
    ]);

    console.log(result);

    const cpaArr = result.map((mark) => mark.CPA);   

    return cpaArr;

  } catch (error) {
    throw error;
  }
}
module.exports = { getScoreService, getClassScoreService };
