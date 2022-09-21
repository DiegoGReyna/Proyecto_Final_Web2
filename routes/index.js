const productsRouter = require('./products.router');
const express = require('express');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', productsRouter);
  //router.use('/categories', productsRouter);
}

module.exports = routerApi;