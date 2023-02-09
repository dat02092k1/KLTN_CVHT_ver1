var userModel = require('../../models/students/studentsModel');

var loginService = async (req, res, next) => {
    const { studentId, password } = req.body;
    console.log(studentId);

    try {
        var user = await userModel.findOne( {studentId});

        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);  
    }
}

module.exports = {
    loginService
}
