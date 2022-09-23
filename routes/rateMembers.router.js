const express = require('express');
const router = express.Router();
const RateMembersService = require('../services/rateMembers.service');
const validatorHandler = require('../middlewares/validator.handler');
const service = new RateMembersService();

const {
  createRateMember
} = require('../dtos/rateMembers.dto');

router.post(
  '/users/:id',
  validatorHandler(createRateMember, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const { id } = req.params;
      const user = parseInt(id);
      const newRateMamber = await service.create(user, body);
      res.json({
        success: true,
        message: 'Member rated successfully',
        data: newRateMamber
      });
    } catch (error) {
      next(error);
    }
  }
);




module.exports = router;
