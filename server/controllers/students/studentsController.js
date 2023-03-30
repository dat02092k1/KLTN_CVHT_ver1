var studentService = require('../../services/students/studentService');     
const { ClientError } = require('../../services/error/error.js');

var getDataStudentControllerfn = async (req, res) => { 
    try {
         
        var allStudent = await studentService.studentServiceGetAll(req.user.username, req.params.class);
        res.status(200).json({ success: true, allStudent });
    } catch (error) {
        console.log(error);
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var createStudentControllerfn = async (req, res) => {
    try {
        var student = await studentService.createStudentService(req.body);
        res.status(200).json({ success: true, student });
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }   
}

var updateStudentControllerfn = async (req, res) => {
    try {
        console.log(req.user);
        var update = await studentService.updateStudentService(req.params.id, req.body, req.user.role);
        res.status(200).json({ success: true, update });
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var getDetailStudentfn = async (req, res) => {
    try {
        var details = await studentService.getStudentDetailService(req.params.id);

         res.status(200).json({ success: true, details });
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var deleteStudentControllerfn = async (req, res) => {
    try {
        const deleteStudent = await studentService.deleteStudentService(req.params.id);
        res.status(200).json({ success: true });
         
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var getNameStudentController = async (req, res) => {
    try {
        const names = await studentService.getNameStudentService(req.params.class);
        res.status(200).json( { success: true, names})
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var uploadStudentsController = async (req, res) => {
    try {
        const students = await studentService.uploadStudentsService(req);
        res.status(200).json( { success: true, students})
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var getStudentStatusController = async (req, res) => {
    try {
        const students = await studentService.getStudentStatusService(req);
        res.status(200).json( { success: true, students})
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}
module.exports = { getDataStudentControllerfn, createStudentControllerfn, 
     getDetailStudentfn, updateStudentControllerfn,
    deleteStudentControllerfn, getNameStudentController, 
    uploadStudentsController, getStudentStatusController } ;         

