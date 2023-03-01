var courseService = require('../../services/score/courseService.js');     

var addCourseController = async (req, res) => { 
    try {
        var course = await courseService.addCourseService(req, res);

        res.status(200).json({ success: true, course });
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: "add course failed" });
    }
}

var getCourseController = async (req, res) => {
    try {
        var courses = await courseService.getCourseService(req.params.studentId);
        res.status(200).json({ success: true, courses });
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: "get courses failed" });
    }
}

var editCourseController = async (req, res) => {
    try {
        var course = await courseService.editCourseService(req.params.courseId, req.body);
        res.status(200).json({ success: true, course });
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: "get courses failed" });
    }
}

var deleteCourseController = async (req, res) => {
    try {
        const {studentId} = req.body;
        var course = await courseService.deleteCourseService(req.params.courseId, studentId);
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: "delete courses failed" });
    }
}

var getCourseDetailsController = async (req, res) => {
    try {
        var course = await courseService.getCourseDetailsService(req.params.courseId);
        res.status(200).json({ success: true, course });
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: "get course failed" });
    }
}
module.exports = { addCourseController, getCourseController,
                    editCourseController, deleteCourseController,
                    getCourseDetailsController } ;         

