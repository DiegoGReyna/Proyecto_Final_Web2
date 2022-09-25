const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const rateMembertId = Joi.number().integer();
const score = Joi.number().integer().min(1).max(5);

const getRateMembertId = Joi.object({
  rateMembertId: rateMembertId.required()
});

const createRateMember = Joi.object({
  score: score.required()
})



module.exports = {
  getRateMembertId,
  createRateMember
};
