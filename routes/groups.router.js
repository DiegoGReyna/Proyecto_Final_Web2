const express = require('express');
const router = express.Router();
const GroupService = require('../services/groups.service');
const validatorHandler = require('../middlewares/validator.handler');
const service = new GroupService();
const {
  getUserId
} = require('../dtos/users.dto');

const {
  createGroup,
  getGroupId,
  editGroup,
  addMemberId,
  addMemberRole
 } = require('../dtos/groups.dto');

router.get(
  '/:groupId/quests',
  validatorHandler(getGroupId, 'params'),
  async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const groupIdInt = parseInt(groupId);
      const quests = await service.getQuests(groupIdInt);
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
  '/:groupId/members',
  validatorHandler(getGroupId, 'params'),
  async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const groupIdInt = parseInt(groupId);
      const members = await service.getMembers(groupIdInt);
      res.json({
        success: true,
        message: 'Members found',
        data: members,
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
        message: 'Groups found',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/creator/:id',
  validatorHandler(createGroup, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const { id } = req.params;
      const idInt = parseInt(id);
      const newGroup = await service.create(idInt, body);
      res.json({
        success: true,
        message: 'Group created successfully',
        data: newGroup
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:groupId',
  validatorHandler(getGroupId, 'params'),
  validatorHandler(editGroup, 'body'),
  async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const idInt = parseInt(groupId);
      const body = req.body;
      const group = await service.edit(idInt, body);
      res.json({
        message: 'Group edited succcessfully',
        data: group
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/:groupId/members/:id',
  validatorHandler(addMemberId, 'params'),
  validatorHandler(addMemberRole, 'body'),
  async (req, res, next) => {
    try {
      const { groupId, id } = req.params;
      const groupIdInt = parseInt(groupId);
      const userIdInt = parseInt(id);
      const body = req.body;
      const role = body.role;
      const member = await service.addMember(groupIdInt, userIdInt, role);
      res.json({
        message: 'Member added successfully',
        data: member
      });
    } catch (error) {
        next(error);
    }
  }
);

router.patch(
  '/:groupId/members/:id',
  validatorHandler(addMemberId, 'params'),
  validatorHandler(addMemberRole, 'body'),
  async (req, res, next) => {
    try {
      const { groupId, id } = req.params;
      const groupIdInt = parseInt(groupId);
      const userIdInt = parseInt(id);
      const body = req.body;
      const role = body.role;
      const members = await service.editMemberRole(groupIdInt, userIdInt, role);
      res.json({
        success: true,
        message: 'Member edited successfully',
        data: members,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:groupId',
  validatorHandler(getGroupId, 'params'),
  async (req, res, next) => {
    try{
    const { groupId } = req.params;
    const groupIdInt = parseInt(groupId);
    await service.delete(groupIdInt);
    res.json({
      message: 'Group deleted successfully',
      groupId
    });
   } catch(error){
      next(error);
    }
  }
);

router.delete(
  '/:groupId/members/:id',
  validatorHandler(addMemberId, 'params'),
  async (req, res, next) => {
    try{
    const { groupId, id } = req.params;
    const userIdInt = parseInt(id);
    const groupIdInt = parseInt(groupId);
    await service.deleteMember(groupIdInt, userIdInt);
    res.json({
      message: 'Member deleted successfully',
      groupId
    });
   } catch(error){
      next(error);
    }
  }
);

module.exports = router;
