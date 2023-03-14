var service = require('../../services/auth/loginService');     

  var loginController = async (req, res, next) => {
    service.loginService(req, res, next); 
}

  var refreshToken = async (req, res) => {
    service.refreshTokenService(req, res);
}

var refreshTokenController = async (req, res) => {
  console.log('refresh service')
  service.refreshService(req, res);
}

  module.exports = {
    loginController, refreshToken, refreshTokenController
  }