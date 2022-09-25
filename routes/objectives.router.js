const express = require('express');
const router = express.Router();
const ObjectivService = require('../services/objectives.service');
const validatorHandler = require('./../middlewares/validator.handler');
const service = new ObjectivService();
const {
  getObjetiveId,
  editObjetive,
  createObjective,
  addParticipant

} = require('../dtos/objectives.dto');

router.get(
  '/:Objectiveid',
  validatorHandler(getObjetiveId, 'params'),
  async (req, res, next) => {
    try {
      const {Objectiveid} = req.params;
      const ObjectiveidInt = parseInt(Objectiveid);
      const objective = await service.get(ObjectiveidInt);
      res.json({
        success: true,
        message: 'objective found',
        data: objective,
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
        message: 'objectives found',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/lists/:id',
  validatorHandler(createObjective, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const { id } = req.params;
      const idInt = parseInt(id);
      const newObjective = await service.createObjective(idInt, body);
      res.json({
        success: true,
        message: 'Objective created successfully',
        data: newObjective
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:Objectiveid',
  validatorHandler(getObjetiveId, 'params'),
  validatorHandler(editObjetive, 'body'),
  async (req, res, next) => {
    try {
      const { Objectiveid } = req.params;
      const ObjectiveInt = parseInt(Objectiveid);
      const body = req.body;
      const quest = await service.edit(ObjectiveInt, body);
      res.json({
        message: 'Objective edited succcessfully',
        data: quest
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:Objectiveid',
  validatorHandler(getObjetiveId, 'params'),
  async (req, res, next) => {
    try{
      const { Objectiveid } = req.params;
      const ObjectiveidInt = parseInt(Objectiveid);
      await service.delete(ObjectiveidInt);
      res.json({
        message: 'Objective deleted successfully'
      });
    }
    catch(error){
      next(error);
    }
  }
);

router.delete(
  '/:Objectiveid/participants/:id',
  validatorHandler(addParticipant, 'params'),
  async (req, res, next) => {
    try{
    const { Objectiveid, id } = req.params;
    const userIdInt = parseInt(id);
    const objectiveIdInt = parseInt(Objectiveid);
    await service.deleteParticipant(objectiveIdInt, userIdInt);
    res.json({
      message: 'Participants deleted successfully',
      Objectiveid
    });
   } catch(error){
      next(error);
    }
  }
);



module.exports = router;
