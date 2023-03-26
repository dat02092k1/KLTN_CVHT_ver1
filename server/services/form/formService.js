const formModel = require("../../models/forms/form.js");
const userModel = require("../../models/students/studentsModel.js");

const mongoose = require("mongoose");
const { ClientError } = require("../error/error.js");

var createFormService = async (req) => {
  try {
    const { student, fileUrl, type } = req.body;

    const getUser = await userModel.findById(student);
    if (!getUser) throw new ClientError("User not found", 404);

    const newForm = new formModel({
      student,
      username: getUser.studentId,
      _class: getUser._class,
      type,
      fileUrl,
    });

    if (!newForm) throw new Error("Create form failed");

    await newForm.save();
    return newForm;
  } catch (error) {
    throw error;
  }
};

var getFormsService = async (req) => {
  try {
    const _class = req.params.class;
    const type = req.query.type;

    console.log(req.query);
    const forms = await formModel.find({ _class, type });

    if (!forms) throw new ClientError("forms not found", 404);

    return forms;
  } catch (error) {
    throw error;
  }
};

var deleteFormService = async (formId) => {
  try {
    const form = await formModel.findByIdAndDelete(formId);

    if (!form) throw new ClientError("cant delete form", 404);

    return "delete form successfully";
  } catch (error) {
    throw error;
  }
};

var updateFormService = async (formId, req) => {
  try {
    const { status } = req.body;

    console.log(status);
    const formExist = await formModel.findById(formId);
    if (!formExist) throw new ClientError("cant find form", 404);
    console.log(formExist);

    formExist.status = status;

    await formExist.save();

    return formExist;
  } catch (error) {
    throw error;
  }
};

var getDetailsFormService = async (formId) => {
  try {
    const form = await formModel.findById(formId);

    if (!form) throw new ClientError("cant find form", 404);

    return form;
  } catch (error) {
    throw error;
  }
};

var getFormsOfUserService = async (studentId) => {
  try {
    console.log(studentId); 
    const forms = await formModel.find({ student: studentId });
    console.log(forms);   
    if (!forms) throw new ClientError("cant find student", 404);

    return forms;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createFormService,
  getFormsService,
  deleteFormService,
  updateFormService,
  getDetailsFormService,
  getFormsOfUserService
};
