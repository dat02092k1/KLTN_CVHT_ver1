var userModel = require('../../models/students/userModel');
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

var createStudentAccount = async (req, res, next) => {
    const { userId, password, role } = req.body;
     
    const hashPassword = await bcrypt.hashSync(password, SALT_ROUNDS);
     
  const user = new userModel({ 
    userId: userId,        
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
