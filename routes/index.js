const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const groupsRouter = require('./groups.router');
const achievementsRouter = require('./achievements.router');
const questsRouter = require('./quests.router');
const express = require('express');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/groups', groupsRouter);
  router.use('/achievements', achievementsRouter);
  router.use('/quests', questsRouter);
}

module.exports = routerApi;
