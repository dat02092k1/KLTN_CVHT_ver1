const mongoose = require('mongoose');
const Joi = require('joi');

const schema = Joi.object().keys({
    studentId: Joi.required(),
    name: Joi.string().required(),
    password: Joi.required(),
    emailAddress: Joi.string().email().required(),
    _class: Joi.required(), 
    birthdate: Joi.required(),
    address: Joi.required(),
    gender: Joi.required(),
    phone: Joi.required(),
});

module.exports = { schema }; 