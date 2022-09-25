const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const achievementId = Joi.number().integer();
const isActive = Joi.boolean().strict();
const name = Joi.string().min(1).max(50);
const desc = Joi.string().min(1).max(200);

const getAchievementId = Joi.object({
  achievementId: achievementId.required()
});

const createAchievement = Joi.object({
  isActive: isActive.required(),
  name: name.required(),
  desc: desc.required()
})

const editAchievement = Joi.object({
  isActive: isActive,
  name: name,
  desc: desc
})

module.exports = {
  getAchievementId,
  createAchievement,
  editAchievement
};
