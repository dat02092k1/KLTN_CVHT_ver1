var studentModel = require('../../models/students/studentsModel');

var studentServiceGetAll = async () => {
    try {
        const data = await studentModel.find({});
        return data;
    } catch (error) {
        return false;
    }
}