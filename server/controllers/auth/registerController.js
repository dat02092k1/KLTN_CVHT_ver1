var registerService = require('../../services/auth/registerService.js');     

  var createStudentAccount = async (req, res, next) => {
    console.log('Reached createStudentAccount in registerController');
    registerService.createStudentAccount(req, res, next);
  }

  module.exports = {
    createStudentAccount
  }