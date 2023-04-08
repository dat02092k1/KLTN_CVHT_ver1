var service = require('../../services/auth/passwordService.js');     
const { ClientError } = require('../../services/error/error.js');

var changePasswordController = async (req, res) => {
    try {
        const {
            oldPassword,
            newPassword
        } = req.body;

         let pass = await service.changePassword(oldPassword, newPassword, req.params.id);
        res.status(200).json({ success: true, pass });
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var forgetPasswordController = async (req, res) => {
    try {
        let msg = await service.forgetPassword(req);
        res.status(200).json({ success: true, msg });
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

var resetPasswordController = async (req, res) => {
    try {
         let newPassword = await service.resetPassword(req.body);
        res.status(200).json({ success: true, newPassword });
    } catch (error) {
        if (error instanceof ClientError) {
            res.status(error.status).send({ message: error.message });
        } else {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}
  module.exports = {
    changePasswordController, resetPasswordController, forgetPasswordController
  }