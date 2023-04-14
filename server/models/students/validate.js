const mongoose = require('mongoose');
const Joi = require('joi');

const schema = Joi.object().keys({
    studentId: Joi.required(),
    name: Joi.string().required(),
    password: Joi.string().min(6).max(20).required(),
    emailAddress: Joi.string().email().required(),
    class: Joi.required(), 
    birthdate: Joi.string().required(),
    address: Joi.string().required(),
    gender: Joi.string().required(),
    phone: Joi.string().required(),
    role: Joi.required(),
});

module.exports = { schema }; 