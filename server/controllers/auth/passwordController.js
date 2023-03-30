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

  module.exports = {
    changePasswordController
  }