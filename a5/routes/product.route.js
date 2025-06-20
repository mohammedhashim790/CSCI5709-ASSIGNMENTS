const express = require('express');
const product_router = express.Router();
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middleware/auth');

product_router.use(authMiddleware.auth_middleware);

product_router.get('/', productController.getProducts);

module.exports = {router: product_router};
