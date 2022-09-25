const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const Objectiveid = Joi.number().integer();
const participantsid = Joi.number().integer();
const priority = Joi.number().integer().min(1).max(10);
const progress = Joi.number().integer().min(1).max(5);
const rol = Joi.string().min(1).max(50)
const name = Joi.string().min(1).max(50);
const desc = Joi.string().min(1).max(200);

const start = Joi.date();
const end = Joi.date();
const isEnded = Joi.boolean().strict();
const isActive = Joi.boolean().strict();

const getObjetiveId = Joi.object({
  Objectiveid: Objectiveid.required(),
});

const createObjective = Joi.object({
  name: name.required(),
  participants: participantsid,
  desc: desc.required(),
  rol:rol.required(),
  priority: priority.required(),
  progress: progress.required(),
  start: start.required(),
  end: end.required()

});

const editObjetive = Joi.object({
  name: name,
  desc: desc,
  rol:rol,
  priority: priority,
  progress: progress,
  start: start,
  end: end,
  isActive: isActive,
  isEnded: isEnded
});

const addParticipant= Joi.object({
  Objectiveid: Objectiveid.required(),
  id: participantsid.required()
});


module.exports = {
  getObjetiveId,
  createObjective,
  editObjetive,
  addParticipant,
};
