var studentService = require('../../services/students/studentService');     

var getDataStudentControllerfn = async (req, res) => { 
    try {
        var student = await studentService.studentServiceGetAll(req.params.class);
        res.status(200).json({ success: true, student });
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ success: false, message: "get all students failed" });
    }
}

var createStudentControllerfn = async (req, res) => {
    try {
        var student = await studentService.createStudentService(req.body);
        res.status(200).json({ success: true, student });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }   
}

var updateStudentControllerfn = async (req, res) => {
    try {
        var update = await studentService.updateStudentService(req.params.id, req.body);
        res.status(200).json({ success: true, update });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
}
module.exports = { getDataStudentControllerfn, createStudentControllerfn, updateStudentControllerfn } ;         