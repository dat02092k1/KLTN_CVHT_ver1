var service = require('../../services/auth/loginService');     

  var loginController = async (req, res, next) => {
    service.loginService(req, res, next); 
}

  module.exports = {
    loginController
  }