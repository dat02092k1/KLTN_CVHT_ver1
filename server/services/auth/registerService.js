var userModel = require('../../models/students/studentsModel');
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

var createStudentAccount = async (req, res, next) => {
    const { studentId, password, role } = req.body;
    console.log(studentId);
    const hashPassword = await bcrypt.hashSync(password, SALT_ROUNDS);

  const user = new userModel({ 
    studentId: studentId, 
    password: hashPassword, 
    role: role });
  user.save(function (err) {
    if (err) {
      res.status(500).send("Error registering new user please try again.");
    } else {
      res.status(200).json(user);
    }
  });
}

module.exports = {
  createStudentAccount
}
