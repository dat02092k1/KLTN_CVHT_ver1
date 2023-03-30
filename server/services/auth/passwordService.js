var userModel = require('../../models/students/studentsModel');
const { ClientError } = require("../error/error.js");
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

var changePassword = async (oldPassword, newPassword, userId) => {
    try {
        if (!oldPassword || !newPassword) {
          throw new ClientError('Old password and new password are required', 400);
        }          
 
        const user = await userModel.findById(userId);
        if (!user) {
          throw new ClientError('User not found', 404);
        }
    
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
          throw new ClientError('Old password is incorrect', 402);
        }
    
        const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
        user.password = hashedPassword;
        const updatedUser = await user.save();
        if (!updatedUser) {
          throw new Error('Failed to update user password');
        }
    
        return updatedUser;
      } catch (error) {
        console.log(error);
        throw error;
      }
}

module.exports = {
    changePassword
}
