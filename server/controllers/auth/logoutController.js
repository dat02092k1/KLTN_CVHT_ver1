var authService = require('../../services/auth/loginService');     

var logoutController = async (req, res) => {
    try {
        var logout = await authService.logoutService(req, res);
        res.status(200).json({ success: true, logout });

    } catch (error) {
        console.log(error);
        res.status(500).json("Logged out failed!");         
    }     
}  

  module.exports = {
    logoutController
  }