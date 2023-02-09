var userModel = require('../../models/students/studentsModel');

var createStudentAccount = async (req, res, next) => {
    const { studentId, password, role } = req.body;
    console.log(studentId);
  const user = new userModel({ studentId, password, role });
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
