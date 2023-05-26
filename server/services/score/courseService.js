const courseModel = require("../../models/score/course.js");
const userModel = require("../../models/students/userModel.js");
const grades = require("../../utils/grade.js");
const { ClientError } = require('../error/error.js');

const mongoose = require("mongoose");

var addCourseService = async (req, res) => {
  try {
    const { semester, semesterCode, studentId, subjects } = req.body;

    const student = await userModel.findById(studentId);
    if (!student) throw new ClientError(`Student not found`, 404);

    const getCourse = await courseModel.findOne({ semesterCode, student: studentId }); 

    if (getCourse) throw new ClientError(`Course existed`, 400); 

    for (const subject of subjects) {
      subject.grade = grades.calculateGrade(subject.score);  
    }
       
    const newCourse = new courseModel({
      semester,
      student: student._id,
      subjects,
      semesterCode
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
      cpaValue < 2.3
        ? "Cảnh báo học vụ"
        : cpaValue > 3.2
        ? "Khen thưởng"
        : "Không";

      student.CPA = grades.roundToTwoDecimalPlaces(cpaValue);

      student.status = status;

      student.total_credits = credits;

    await student.save();
    return { Course: course, Student: student };     
  } catch (error) {
    throw error;
  }
};

var getCourseService = async (studentId) => {
  try {
    const course = await courseModel.find({ student: studentId }).sort({ semesterCode: -1 });

    if (!course) throw new ClientError("There're no courses in history", 404);

    return course;
  } catch (error) {
    throw error;
  }
};

var editCourseService = async (courseId, courseDetails) => {
  try {
     
    const subjects = courseDetails.subjects;
     
    console.log(courseDetails);
    for (const subject of subjects) {
      subject.grade = grades.calculateGrade(subject.score);  
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

    const updateCourse = await courseModel.findByIdAndUpdate(
      courseId,
      { ...courseDetails, GPA, total_credits },
      { new: true }
    );

    if (!updateCourse) {
      throw new ClientError(`No course found with id: ${courseId}`, 404);
    }
     
    const student = await userModel.findById(updateCourse.student);  

    if (!student) throw new ClientError(`Student not found`, 404);

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
      cpaValue < 2.3
        ? "Cảnh báo học vụ"
        : cpaValue > 3.2
        ? "Khen thưởng"
        : "Không";

      student.CPA = grades.roundToTwoDecimalPlaces(cpaValue);

      student.status = status;

      student.total_credits = credits;
    
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
     
    console.log(deleteCourse);

    if (deleteCourse) {

      const student = await userModel.findById(studentId);  

    if (!student) throw new ClientError(`Student not found`, 404);

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
     
    const cpaValue = result[0]?.CPA ?? 0;
    const totalCredits = result[0]?.total_credits ?? 0;
    const status =
      cpaValue < 3.0
        ? "Cảnh báo học vụ"
        : cpaValue > 3.2
        ? "Khen thưởng"          
        : "Không"; 

      student.CPA = grades.roundToTwoDecimalPlaces(cpaValue);
      student.status = status;
      student.total_credits = totalCredits;

      await student.save();

      return student;
    } else {
      throw new ClientError("Couse is not found", 404);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

var getCourseDetailsService = async (courseId) => {
  try {
    const course = await courseModel.findById(courseId);

    if (!course) throw new ClientError('Course not found', 404); 

    return course;
  } catch (error) {
    throw error;
  }
}

var importCoursesExcel = async (req) => {
  try {
    const data = req.data; 
     
    const courses = [];

    for (let i = 0; i < data.length; i++) {
       
      const {
        semester, studentId, subjectName, subjectCode, subjectScore, subjectCredits, semesterCode 
      } = data[i];
 
      const student = await userModel.find({ userId: studentId });
      if (!student) throw new ClientError(`Student not found`, 404); 

      const getCourse = await courseModel.findOne({ semesterCode, studentId }); 
      console.log(getCourse);
      if (getCourse) throw new ClientError(`Course existed`, 400); 
      
      const Sid = student[0]._id;
      console.log(student[0]);
      const subject = { name: subjectName, code: subjectCode, score: subjectScore, credits: subjectCredits };
       
      let course = courses.find(c => {
        return c.semester === semester.toString() && c.student.toString() === Sid.toString();
      });
        
      if (!course) {
        course = new courseModel({ semester, student: Sid, studentId: studentId, semesterCode });
        courses.push(course);
      }
      course.subjects.push(subject);
       console.log('flag 1st loop')
    }
    
    for (const course of courses) {
      // Calculate GPA and total credits for course based on subjects
      let totalScore = 0;
      let total_credits = 0;
   
      for (const subject of course.subjects) {
        totalScore += (grades.convertGradeByRand4(subject.score) * subject.credits);
        total_credits += subject.credits;
        subject.grade = grades.calculateGrade(subject.score);  
      }

      const gpaRaw = totalScore / total_credits;
      const GPA = grades.roundToTwoDecimalPlaces(gpaRaw);

      course.GPA = GPA;
      course.total_credits = total_credits;
      // Save course to database
      await course.save();
      
      const student = await userModel.findById(course.student);
       
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
        cpaValue < 2.3
          ? "Cảnh báo học vụ"
          : cpaValue > 3.2
          ? "Khen thưởng"
          : "Không";
  
        student.CPA = grades.roundToTwoDecimalPlaces(cpaValue);
  
        student.status = status;
  
        student.total_credits = credits;
  
      await student.save();       
    }

    return courses;
    
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addCourseService,
  getCourseService,
  editCourseService,
  deleteCourseService,
  getCourseDetailsService,
  importCoursesExcel
};