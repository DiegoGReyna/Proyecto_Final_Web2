const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const groupId = Joi.number().integer();
const isActive = Joi.boolean().strict();
const name = Joi.string().min(1).max(50);
const desc = Joi.string().min(1).max(200);
const creator = Joi.number().integer();

const getGroupId = Joi.object({
  groupId: groupId.required()
});

const addMemberRole = Joi.object({
  role: name.required()
});

const addMemberId = Joi.object({
  groupId: groupId.required(),
  id: creator.required()
});

const createGroup = Joi.object({
  isActive: isActive.required(),
  name: name.required(),
  desc: desc.required()
});

const editGroup = Joi.object({
  isActive: isActive,
  name: name,
  desc: desc
});

module.exports = {
  getGroupId,
  createGroup,
  editGroup,
  addMemberId,
  addMemberRole
};
