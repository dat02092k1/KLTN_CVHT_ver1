var formService = require("../../services/form/formService.js");
const { ClientError } = require("../../services/error/error.js");

var createFormController = async (req, res) => {
  try {
    var form = await formService.createFormService(req);
    res.status(200).json({ success: true, form });
  } catch (error) {
    console.log(error);
    if (error instanceof ClientError) {
      res.status(error.status).send({ message: error.message });
    } else {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
};

var getFormsController = async (req, res) => {
  try {
    var forms = await formService.getFormsService(req);
    res.status(200).json({ success: true, forms });
  } catch (error) {
    console.log(error);
    if (error instanceof ClientError) {
      res.status(error.status).send({ message: error.message });
    } else {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
};

var deleteFormController = async (req, res) => {
  try {
    var msg = await formService.deleteFormService(req.params.id);
    res.status(200).json({ success: true, msg });
  } catch (error) {
    console.log(error);
    if (error instanceof ClientError) {
      res.status(error.status).send({ message: error.message });
    } else {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
};

var updateFormController = async (req, res) => {
  try {
    var form = await formService.updateFormService(req.params.id, req);
    res.status(200).json({ success: true, form });
  } catch (error) {
    console.log(error);
    if (error instanceof ClientError) {
      res.status(error.status).send({ message: error.message });
    } else {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
};

var getDetailsFormController = async (req, res) => {
  try {
    var form = await formService.getDetailsFormService(req.params.id);
    res.status(200).json({ success: true, form });
  } catch (error) {
    console.log(error);
    if (error instanceof ClientError) {
      res.status(error.status).send({ message: error.message });
    } else {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
};

var getFormsUserController = async (req, res) => {
  try {
    var form = await formService.getFormsOfUserService(req.params.id);
    res.status(200).json({ success: true, form });
  } catch (error) {
    console.log(error);
    if (error instanceof ClientError) {
      res.status(error.status).send({ message: error.message });
    } else {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
};

var getFormsByType = async (req, res) => {
  try {
    var forms = await formService.getFormsByTypeService(req);
    res.status(200).json({ success: true, forms });
  } catch (error) {
    console.log(error);
    if (error instanceof ClientError) {
      res.status(error.status).send({ message: error.message });
    } else {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
};

var getFormsRest = async (req, res) => {
  try {
    var forms = await formService.getFormsRestService(req.params.id);
    res.status(200).json({ success: true, forms });
  } catch (error) {
    console.log(error);
    if (error instanceof ClientError) {
      res.status(error.status).send({ message: error.message });
    } else {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
};
module.exports = {
  createFormController,
  getFormsController,
  deleteFormController,
  updateFormController,
  getDetailsFormController,
  getFormsUserController,
  getFormsByType,
  getFormsRest
};
