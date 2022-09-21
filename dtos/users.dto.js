const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.number().integer();
const isActive = Joi.boolean().strict();
const name = Joi.string().min(3).max(50);
const mail = Joi.string().email().max(200);
const image = Joi.number().integer().min(0).max(9);
const password = Joi.string();

const getUserByMail = Joi.object({
  mail: mail.required(),
});

const getUserId = Joi.object({
  id: id.required(),
});

const registerUser = Joi.object({
  isActive: isActive.required(),
  name: name.required(),
  mail: mail.required(),
  image: image.required(),
  password:password.required()
});

const editUser = Joi.object({
  isActive: isActive,
  name: name,
  mail: mail,
  image: image,
  password:password
});

const editUserComplete = Joi.object({
  isActive: isActive.required(),
  name: name.required(),
  mail: mail.required(),
  image: image.required(),
  password:password.required()
});

module.exports = {
  getUserByMail,
  registerUser,
  getUserId,
  editUser,
  editUserComplete
};
