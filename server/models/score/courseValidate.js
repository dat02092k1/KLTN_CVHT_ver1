const mongoose = require('mongoose');
const Joi = require('joi');

const courseSchema = Joi.object().keys({
    semester: Joi.required(),
    semesterCode: Joi.required(),
    studentId: Joi.required(),
    subjectName: Joi.string().required(),
    subjectCode: Joi.required(),
    subjectScore: Joi.required(),
    subjectCredits: Joi.required()
});

module.exports = { courseSchema }; 