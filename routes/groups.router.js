const express = require('express');
const router = express.Router();
const GroupService = require('../services/groups.service');
const validatorHandler = require('../middlewares/validator.handler');
const service = new GroupService();
const {
  registerUser,
  getUserId,
  editUser,
  editUserComplete
} = require('../dtos/users.dto');

router.get(
  '/:id/quests',
  validatorHandler(getUserId, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const idInt = parseInt(id);
      const quests = await service.getQuests(idInt);
      res.json({
        success: true,
        message: 'Quests found',
        data: quests,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/user/:id',
  validatorHandler(getUserId, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const idInt = parseInt(id);
      const groups = await service.getByUserId(idInt);
      res.json({
        success: true,
        message: 'Groups found',
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
        message: 'Users found',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(registerUser, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newUser = await service.register(body);
      res.json({
        success: true,
        message: 'User created successfully',
        data: newUser
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getUserId, 'params'),
  validatorHandler(editUser, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const idInt = parseInt(id);
      const body = req.body;
      const user = await service.edit(idInt, body);
      res.json({
        message: 'User edited succcessfully',
        data: user,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);

router.put(
  '/:id',
  validatorHandler(getUserId, 'params'),
  validatorHandler(editUserComplete, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const idInt = parseInt(id);
      const body = req.body;
      const user = await service.editComplete(idInt, body);
      res.json({
        message: 'Whole user edited successfully',
        data: user,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getUserId, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const idInt = parseInt(id);
    await service.delete(idInt);
    res.json({
      message: 'User deleted successfully',
      id,
    });
  }
);

module.exports = router;
