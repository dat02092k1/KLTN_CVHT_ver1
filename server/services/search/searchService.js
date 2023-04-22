const studentModel = require('../../models/students/userModel.js');

const mongoose = require('mongoose');

var getSearchStudentService = async (req, res) => { 
    try {
        const query = req.query.q;

        const student = await studentModel.find({ studentId: { $regex: query } });  

        if (!student) throw new Error(`Student not found`);

        return student; 
    } catch (error) {
        throw error;
    }
}

module.exports = { getSearchStudentService } ;  