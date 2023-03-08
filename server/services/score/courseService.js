const courseModel = require("../../models/score/course.js");
const studentsModel = require("../../models/students/studentsModel.js");
const grades = require("../../utils/grade.js");
const mongoose = require("mongoose");

var addCourseService = async (req, res) => {
  try {
    const { semester, studentId, subjects } = req.body;

    const student = await studentsModel.findById(studentId);
    if (!student) throw new Error(`Student not found`);

    for (const subject of subjects) {
      subject.grade = grades.calculateGrade(subject.score);  
      console.log(subject.grade); 
    }
       
    const newCourse = new courseModel({
      semester,
      student: student._id,
      subjects,
    });

    let totalScore = 0;
    let total_credits = 0;

    for (const subject of subjects) {
      totalScore += (grades.convertGradeByRand4(subject.score) * subject.credits);
      total_credits += subject.credits;
    }


    const course = await newCourse.save();

     
    const gpaRaw = totalScore / total_credits;
    const GPA = grades.roundToTwoDecimalPlaces(gpaRaw);
    console.log(GPA);
    await courseModel.findByIdAndUpdate(course._id, { GPA, total_credits });

    const result = await courseModel.aggregate([
      { $match: { student: student._id } },
      {
        $group: {
          _id: null,
          totalGPA: { $sum: { $multiply: ["$GPA", "$total_credits"] } },
          totalCredits: { $sum: "$total_credits" },
        },
      },
      {
        $project: {
          _id: 0,
          CPA: { $divide: ["$totalGPA", "$totalCredits"] },
          totalCredits: "$totalCredits",
        },
      },
    ]);

    const cpaValue = result[0].CPA;
    const credits = result[0].totalCredits;

    const status =
      cpaValue < 3.0
        ? "Cảnh báo học vụ"
        : cpaValue > 3.2
        ? "Khen thưởng"
        : "Không";

      student.CPA = cpaValue;

      student.status = status;

      student.total_creadits = credits;

    await student.save();
    return { Course: course, Student: student };     
  } catch (error) {
    throw error;
  }
};

var getCourseService = async (studentId) => {
  try {
    const course = await courseModel.find({ student: studentId });

    if (!course) throw new Error("There're no courses in history");

    return course;
  } catch (error) {
    throw error;
  }
};

var editCourseService = async (courseId, courseDetails) => {
  try {
     
    const subjects = courseDetails.subjects;
     

    for (const subject of subjects) {
      subject.grade = grades.calculateGrade(subject.score);  
      console.log(subject.grade); 
    }
     
    // const objectId = mongoose.Types.ObjectId(username);
    let totalScore = 0;
    let total_credits = 0;

    for (const subject of subjects) {
      totalScore += (grades.convertGradeByRand4(subject.score) * subject.credits);      
      total_credits += subject.credits;
    }

     
    const gpaRaw = totalScore / total_credits;
    const GPA = grades.roundToTwoDecimalPlaces(gpaRaw);
    console.log(GPA);

    const updateCourse = await courseModel.findByIdAndUpdate(
      courseId,
      { ...courseDetails, GPA, total_credits },
      { new: true }
    );

    if (!updateCourse) {
      throw new Error(`No course found with id: ${courseId}`);
    }
    console.log(updateCourse.student);
    const student = await studentsModel.findById(updateCourse.student);  

    if (!student) throw new Error(`Student not found`);

    const result = await courseModel.aggregate([
      { $match: { student: student._id } },
      {
        $group: {
          _id: null,
          totalGPA: { $sum: { $multiply: ["$GPA", "$total_credits"] } },
          totalCredits: { $sum: "$total_credits" },
        },
      },
      {
        $project: {
          _id: 0,
          CPA: { $divide: ["$totalGPA", "$totalCredits"] },
          totalCredits: "$totalCredits",
        },
      },
    ]);

    const cpaValue = result[0].CPA;
    const credits = result[0].totalCredits;

    const status =
      cpaValue < 3.0
        ? "Cảnh báo học vụ"
        : cpaValue > 3.2
        ? "Khen thưởng"
        : "Không";

      student.CPA = cpaValue;

      student.status = status;

      student.total_creadits = credits;

    console.log(student);
    
    await student.save();
    return {
      Update: updateCourse,
      Student: student
    };
  } catch (error) {
    throw error;
  }
};

var deleteCourseService = async (courseId, studentId) => {
  try {   
    const deleteCourse = await courseModel.findByIdAndDelete(courseId);
     

    if (deleteCourse) {

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

      return student;
    } else {
      throw new Error("Couse is not found");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

var getCourseDetailsService = async (courseId) => {
  try {
    const course = await courseModel.findById(courseId);

    if (!course) throw new Error('Course not found'); 

    return course;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addCourseService,
  getCourseService,
  editCourseService,
  deleteCourseService,
  getCourseDetailsService
};
