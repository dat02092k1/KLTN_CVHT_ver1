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
              },
      
        }
    ]);

    const cpaValue = result[0].CPA;

    const status =
      cpaValue < 3.0
        ? "Cảnh báo học vụ"
        : cpaValue > 3.2
        ? "Khen thưởng"          
        : "Không"; 

    const newScore = new scoreModel({
            student: studentId,
            CPA: cpaValue,
            status: status,
          });
    await newScore.save();

    return newScore; 
  } catch (error) {
    throw error;
  }
};

module.exports = { getScoreService };
