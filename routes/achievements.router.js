const express = require('express');
const router = express.Router();
const AchievementsService = require('../services/achievements.service');
const validatorHandler = require('../middlewares/validator.handler');
const service = new AchievementsService();

const {
  getAchievementId,
  createAchievement,
  editAchievement
} = require('../dtos/achievements.dto');

router.get(
  '/:achievementId',
  validatorHandler(getAchievementId, 'params'),
  async (req, res, next) => {
    try {
      const { achievementId } = req.params;
      const achievementIdInt = parseInt(achievementId);
      const groups = await service.getById(achievementIdInt);
      res.json({
        success: true,
        message: 'Achievements found',
        data: groups,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/',
  async (req, res, next) => {
    try {
      const user = await service.getAll();
      res.json({
        success: true,
        message: 'Achievements found',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createAchievement, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newAchievement = await service.create(body);
      res.json({
        success: true,
        message: 'Achievement created successfully',
        data: newAchievement
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:achievementId',
  validatorHandler(getAchievementId, 'params'),
  validatorHandler(editAchievement, 'body'),
  async (req, res, next) => {
    try {
      const { achievementId } = req.params;
      const achievementIdInt = parseInt(achievementId);
      const body = req.body;
      const achievement = await service.edit(achievementIdInt, body);
      res.json({
        message: 'Achievement edited succcessfully',
        data: achievement
      });
    } catch (error) {
      next(error);
    }
  }
);


router.delete(
  '/:achievementId',
  validatorHandler(getAchievementId, 'params'),
  async (req, res, next) => {
    try{
    const { achievementId } = req.params;
    const achievementIdInt = parseInt(achievementId);
    await service.delete(achievementIdInt);
    res.json({
      message: 'Achievement deleted successfully',
      achievementId
    });
   } catch(error){
      next(error);
    }
  }
);


module.exports = router;
