const express = require('express');
const router = express.Router();
const ListsService = require('../services/lists.service');
const validatorHandler = require('./../middlewares/validator.handler');
const service = new ListsService();
const {
  getListId,
  createList,
  editList,
  addlist

} = require('../dtos/lists.dto');

router.get(
  '/:id',
  validatorHandler(getListId, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const ListIdInt = parseInt(id);
      const List = await service.get(ListIdInt);
      res.json({
        success: true,
        message: 'List found',
        data: List,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  '/:id/objectives',
  validatorHandler(getListId, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const ListIdInt = parseInt(id);
      const Objectives = await service.getObjectives(ListIdInt);
      res.json({
        success: true,
        message: 'Objectives found',
        data: Objectives,
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
        message: 'list found',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/quests/:id',
  validatorHandler(createList, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const { id } = req.params;
      const idInt = parseInt(id);
      const newList = await service.create(idInt,body);
      res.json({
        success: true,
        message: 'List created successfully',
        data: newList
      });
    } catch (error) {
      next(error);
    }
  }
);

 router.patch(
  '/:id',
  validatorHandler(getListId, 'params'),
   validatorHandler(editList, 'body'),
   async (req, res, next) => {
     try {
       const { id } = req.params;
      const IdInt = parseInt(id);
       const body = req.body;
       const quest = await service.edit(IdInt, body);
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
  '/:id',
  validatorHandler(getListId, 'params'),
   async (req, res, next) => {
    try{
      const {id} = req.params;
      const listIdIdInt = parseInt(id);
       await service.delete(listIdIdInt);
      res.json({
        message: 'List deleted successfully'
       });
    }
     catch(error){
       next(error);
    }
  }
 );

 router.patch(
  '/:listId/objectives/:Obejectiveid',
  validatorHandler(addlist, 'params'),
  async (req, res, next) => {
    try {
      const { listId, Obejectiveid } = req.params;
      const listIdInt = parseInt(listId);
      const ObejectiveIdInt = parseInt(Obejectiveid);
      const member = await service.addObjective(listIdInt, ObejectiveIdInt);
      res.json({
        message: 'Objevtive added successfully',
        data: member
      });
    } catch (error) {
        next(error);
    }
  }
);

module.exports = router;
