var studentService = require('../../services/students/studentService');     

var getDataStudentControllerfn = async (req, res) => { 
    try {
        var allStudent = await studentService.studentServiceGetAll(req.params.class);
        res.status(200).json({ success: true, allStudent });
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

var getDetailStudentfn = async (req, res) => {
    try {
        var details = await studentService.getStudentDetailService(req.params.id);

         res.status(200).json({ success: true, details });
    } catch (error) {
        console.log(error.message);
        if (error.message === 'ID is required') {
            res.status(400).send({ message: error.message });
        } else if (error.message === 'Student not found') {
            res.status(404).send({ message: error.message });
        } else {
            res.status(500).send({ message: " server error" });
        }
    }
}

var deleteStudentControllerfn = async (req, res) => {
    try {
        const deleteStudent = await studentService.deleteStudentService(req.params.id);
        res.status(200).json({ success: true });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
}
module.exports = { getDataStudentControllerfn, createStudentControllerfn, 
     getDetailStudentfn, updateStudentControllerfn,
    deleteStudentControllerfn } ;         

