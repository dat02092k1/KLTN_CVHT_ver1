var courseService = require('../../services/score/courseService.js');     
const { ClientError } = require('../../services/error/error.js');

var addCourseController = async (req, res) => { 
    try {
        var course = await courseService.addCourseService(req, res);

        res.status(200).json({ success: true, course });
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var getCourseController = async (req, res) => {
    try {
        var courses = await courseService.getCourseService(req.params.studentId);
        res.status(200).json({ success: true, courses });
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var editCourseController = async (req, res) => {
    try {
        var course = await courseService.editCourseService(req.params.courseId, req.body);
        res.status(200).json({ success: true, course });
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var deleteCourseController = async (req, res) => {
    try {
        const studentId = req.query.student;
        var course = await courseService.deleteCourseService(req.params.courseId, studentId);
        res.status(200).json({ success: true, course });
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var getCourseDetailsController = async (req, res) => {
    try {
        var course = await courseService.getCourseDetailsService(req.params.courseId);
        res.status(200).json({ success: true, course });
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var importCoursesExcel = async (req, res) => {
    try {
        var courses = await courseService.importCoursesExcel(req);
        res.status(200).json({ success: true, courses });
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}
module.exports = { addCourseController, getCourseController,
                    editCourseController, deleteCourseController,
                    getCourseDetailsController, importCoursesExcel } ;         

