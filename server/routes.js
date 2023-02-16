const express = require('express');
const Router = express.Router();
const controller = require('./controllers/products.js')

Router.get('/products', controller.get)


module.exports = Router;