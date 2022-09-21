const express = require('express');
const router = express.Router();
const ProductService = require('../services/products.service');
const validatorHandler = require('./../middlewares/validator.handler');
const service = new ProductService();
const {
  createProductDto,
  updateProductDto,
  getProductId,
} = require('../dtos/products.dto');

router.get('/', async (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const products = await service.find(limit);
  res.json(products);
});

//STATUS CODE

router.get(
  '/:id',
  validatorHandler(getProductId, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json({
        success: true,
        message: 'Este es el producto encontrado',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  validatorHandler(createProductDto, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newProduct = await service.create(body);
      res.json({
        success: true,
        message: 'Producto creado correctamente',
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
  }
);

//MENSAJES DE ERROR
router.patch(
  '/:id',
  validatorHandler(getProductId, 'params'),
  validatorHandler(updateProductDto, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json({
        message: 'update',
        data: product,
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
  validatorHandler(getProductId, 'params'),
  validatorHandler(updateProductDto, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.updateComplete(id, body);
      res.json({
        message: 'update total',
        data: product,
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
  validatorHandler(getProductId, 'params'),
  async (req, res) => {
    const { id } = req.params;
    res.json({
      message: 'delete',
      id,
    });
  }
);

module.exports = router;
