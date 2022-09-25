const Joi = require('joi');
//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.number().integer();
const Obejectiveid = Joi.number().integer();
const isActive = Joi.boolean().strict();
const name = Joi.string().min(1).max(50);

const getListId = Joi.object({
  id: id.required(),
});

const createList = Joi.object({
  name: name.required(),

});

const editList = Joi.object({
  name: name,
  isActive: isActive

});
const addlist = Joi.object({
  listId: id.required(),
  Obejectiveid: Obejectiveid.required()
});

module.exports = {
  getListId,
  createList,
  editList,
  addlist
};
