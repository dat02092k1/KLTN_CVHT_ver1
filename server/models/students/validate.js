const mongoose = require('mongoose');
const Joi = require('joi');

const schema = Joi.object().keys({
    userId: Joi.required(),
    name: Joi.string().required(),
    password: Joi.string().min(6).max(15).required(),
    emailAddress: Joi.string().email().required(),
    class: Joi.required(), 
    birthdate: Joi.required(),
    address: Joi.string().required(),
    gender: Joi.string().required(),
    phone: Joi.required(),
    role: Joi.required(),
});

module.exports = { schema }; 