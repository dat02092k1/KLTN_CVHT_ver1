var studentModel = require('../../models/students/studentsModel');

var studentServiceGetAll = async (_class) => {
    try {
        const data = await studentModel.find({ class: _class });
        return data;
    } catch (error) {
        return false;
    } 
};         

module.exports = { studentServiceGetAll } ; 