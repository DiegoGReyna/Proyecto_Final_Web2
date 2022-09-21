const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string().alphanum();
const isActive = Joi.boolean();
const name = Joi.string().min(3).max(50);
const price = Joi.number().integer().min(10);
const image = Joi.string();

const createProductDto = Joi.object({
  isActive: isActive.required(),
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

const updateProductDto = Joi.object({
  isActive: isActive,
  name: name,
  price: price,
  image: image,
});

const getProductId = Joi.object({
  id: id.required(),
});

module.exports = {
  createProductDto,
  updateProductDto,
  getProductId,
};
