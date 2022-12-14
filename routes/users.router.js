const express = require('express');
const router = express.Router();
const UserService = require('../services/users.service');
const validatorHandler = require('./../middlewares/validator.handler');
const service = new UserService();
const {
  getUserByMail,
  registerUser,
  getUserId,
  editUser,
  editUserComplete
} = require('../dtos/users.dto');

router.get(
  '/login/:mail',
  validatorHandler(getUserByMail, 'params'),
  async (req, res, next) => {
    try {
      const { mail } = req.params;
      const user = await service.login(mail);
      res.json({
        success: true,
        message: 'User found',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  validatorHandler(getUserId, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const idInt = parseInt(id);
      const user = await service.get(idInt);
      res.json({
        success: true,
        message: 'User found',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/byMail/:mail',
  validatorHandler(getUserByMail, 'params'),
  async (req, res, next) => {
    try {
      const { mail } = req.params;
      const user = await service.getIdByMail(mail);
      res.json({
        success: true,
        message: 'User found',
        data: user,
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
  async (req, res, next) => {
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
      next(error);
    }
  }
);

router.put(
  '/:id',
  validatorHandler(getUserId, 'params'),
  validatorHandler(editUserComplete, 'body'),
  async (req, res, next) => {
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
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getUserId, 'params'),
  async (req, res, next) => {
    try{
      const { id } = req.params;
      const idInt = parseInt(id);
      await service.delete(idInt);
      res.json({
        message: 'User deleted successfully',
        id,
      });
    } catch(error){
      next(error);
    }
  }
);

module.exports = router;
