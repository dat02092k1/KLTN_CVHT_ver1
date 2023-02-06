var studentService = require('../../services/students/students');     

var getDataStudentControllerfn = async (req, res) => { 
    try {
        var student = await studentServiceGetAll() 
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getDataStudentControllerfn } ; 