const courseModel = require("../../models/score/course.js");
const studentsModel = require("../../models/students/studentsModel.js");

const mongoose = require("mongoose");

var addCourseService = async (req, res) => {
  try {
    const { semester, studentId, subjects } = req.body;

    const student = await studentsModel.findById(studentId);
    if (!student) throw new Error(`Student not found`);

    const newCourse = new courseModel({
      semester,
      student: student._id,
      subjects,
    });

    let totalScore = 0;
    let total_credits = 0;

    for (const subject of subjects) {
      totalScore += subject.score * subject.credits;
      total_credits += subject.credits;
    }

    const course = await newCourse.save();

    const GPA = totalScore / total_credits;
    console.log(GPA);
    await courseModel.findByIdAndUpdate(course._id, { GPA, total_credits });

    return course;
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
    console.log(subjects);
    // const objectId = mongoose.Types.ObjectId(username);
    let totalScore = 0;
    let total_credits = 0;

    for (const subject of subjects) {
      totalScore += subject.score * subject.credits;
      total_credits += subject.credits;
    }

    const GPA = totalScore / total_credits;
    console.log(GPA);
    const updateCourse = await courseModel.findByIdAndUpdate(
      courseId,
      { ...courseDetails, GPA, total_credits },
      { new: true }
    );

    if (!updateCourse) {
      throw new Error(`No course found with id: ${courseId}`);
    }

    return updateCourse;
  } catch (error) {
    throw error;
  }
};

var deleteCourseService = async (courseId) => {
    try {
        const deleteCourse = await courseModel.findByIdAndDelete(courseId);

        console.log(courseId);  
        if (deleteCourse) {
            return "Deleted successfully!";
        } else {
            throw new Error('Post is not found');
          }
    } catch (error) {
        throw error;
    }
}

module.exports = { addCourseService, getCourseService, 
                editCourseService, deleteCourseService };
