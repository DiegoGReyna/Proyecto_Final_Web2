const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.number().integer();
const isActive = Joi.boolean().strict();
const name = Joi.string().min(1).max(50);
const desc = Joi.string().min(1).max(200);
const start = Joi.date();
const end = Joi.date();
const isEnded = Joi.boolean().strict();

const getQuestId = Joi.object({
  id: id.required(),
});

const createQuest = Joi.object({
  isActive: isActive.required(),
  name: name.required(),
  desc: desc.required(),
  start: start.required(),
  end: end.required()
});


module.exports = {
  getQuestId,
  createQuest
};
