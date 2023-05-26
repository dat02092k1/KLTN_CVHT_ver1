var registerService = require('../../services/auth/registerService.js');     

  var createStudentAccount = async (req, res, next) => {
    registerService.createStudentAccount(req, res, next);
  }

  module.exports = {
    createStudentAccount
  }