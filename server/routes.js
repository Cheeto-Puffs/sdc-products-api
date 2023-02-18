const express = require('express');
const Router = express.Router();
const controller = require('./controllers/products.js')

Router.get('/products', controller.getProducts)

Router.get('/products/:product_id', controller.getProductById)

Router.get('/products/:product_id/styles', controller.getStylesById)

Router.get('/products/:product_id/related', controller.getRelatedProductsById)

module.exports = Router;