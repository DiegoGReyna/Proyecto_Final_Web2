const express = require('express');
const router = express.Router();
const QuestService = require('../services/quests.service');
const validatorHandler = require('./../middlewares/validator.handler');
const service = new QuestService();
const {
  getQuestId,
  createQuest,
  editQuest
} = require('../dtos/quests.dto');

router.get(
  '/:questId',
  validatorHandler(getQuestId, 'params'),
  async (req, res, next) => {
    try {
      const { questId } = req.params;
      const questIdInt = parseInt(questId);
      const quest = await service.get(questIdInt);
      res.json({
        success: true,
        message: 'Quest found',
        data: quest,
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
        message: 'Quests found',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);




router.post(
  '/',
  validatorHandler(createQuest, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newQuest = await service.create(body);
      res.json({
        success: true,
        message: 'Quest created successfully',
        data: newQuest
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:questId',
  validatorHandler(getQuestId, 'params'),
  validatorHandler(editQuest, 'body'),
  async (req, res, next) => {
    try {
      const { questId } = req.params;
      const questIdInt = parseInt(questId);
      const body = req.body;
      const quest = await service.edit(questIdInt, body);
      res.json({
        message: 'Quest edited succcessfully',
        data: quest
      });
    } catch (error) {
      next(error);
    }
  }
);


router.delete(
  '/:questId',
  validatorHandler(getQuestId, 'params'),
  async (req, res, next) => {
    try{
      const { questId } = req.params;
      const questIdInt = parseInt(questId);
      await service.delete(questIdInt);
      res.json({
        message: 'Quest deleted successfully'
      });
    }
    catch(error){
      next(error);
    }
  }
);
router.get(
  '/:questId/lists',
  validatorHandler(getQuestId, 'params'),
  async (req, res, next) => {
    try {
      const { questId } = req.params;
      const questIdInt = parseInt(questId);
      const members = await service.getLists(questIdInt );
      res.json({
        success: true,
        message: 'Lists found',
        data: members,
      });
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
