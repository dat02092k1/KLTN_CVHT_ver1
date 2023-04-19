var userModel = require('../../models/students/studentsModel');
const email = require('../../utils/email.js');
const { ClientError } = require("../error/error.js");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

var changePassword = async (oldPassword, newPassword, userId) => {
    try {
        if (!oldPassword || !newPassword) {
          throw new ClientError('Old password and new password are required', 400);
        }          
        console.log(userId);
        const user = await userModel.findById(userId);
        if (!user) {
          throw new ClientError('User not found', 404);
        }
        console.log(user);
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
          throw new ClientError('Old password is incorrect', 402);
        }
        console.log(isMatch);
        const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
        user.password = hashedPassword;
        console.log(hashedPassword);
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

var forgetPassword = async (req) => {
  try {   
    const { emailAddress } = req.body;
    console.log(req.body); 

    if (!emailAddress) {
        throw new ClientError('Email is required', 400);
    }          

      const user = await userModel.findOne({ emailAddress: emailAddress });

      if (!user) {
        throw new ClientError('User not found', 404);
      }
  
      const token = jwt.sign({ userId: user._id}, process.env.JWT_PASSWORD, { expiresIn: '1h' });

      const to = user.emailAddress;

      const subject = "Reset password request";
      
      const html = `<div>
      your token: ${token}
     <br>
     <a href="http://127.0.0.1:5173/reset-password/${user._id}">Nhấn vào đây để thiết lập mật khẩu mới</a>
     </div>`;

      await email(user.emailAddress, subject, html);
  
      return 'New token is sent to your email address to verify';
    } catch (error) {
      console.log(error);
      throw error;
    }
}

var resetPassword = async (data) => {
    const { token, password } = data;
      
    if (!token) {
      throw new ClientError('No token found', 400);
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
    console.log(decoded);

    const user = await userModel.findById(decoded.userId);

    if (!user) {
      throw new ClientError('User not found', 404);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    user.password = hashedPassword; 
    await user.save();

    return 'Password reset successful';
    } 
    catch (error) {
      console.log(error);
      throw error;
    }
}

module.exports = {
    changePassword, resetPassword, forgetPassword
}
