const express = require('express');
const Router = express.Router();
const authController = require('../controllers/authController');
const validator = require('express-joi-validation').createValidator({});
const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(20).required()
})


Router.post('/api/userLogin', validator.body(loginSchema), authController.userLogin);
Router.post('/api/userRegister', authController.userRegister);



module.exports = Router;