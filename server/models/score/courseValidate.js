const mongoose = require('mongoose');
const Joi = require('joi');

const courseSchema = Joi.object().keys({
    semester: Joi.required(),
    studentId: Joi.required(),
    subjectName: Joi.string().required(),
    subjectScore: Joi.required(),
    subjectCredits: Joi.required()
});

module.exports = { courseSchema }; 