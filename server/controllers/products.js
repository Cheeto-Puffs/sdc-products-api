const model = require('../models/products.js')
module.exports = {

  getProducts: async (req, res) => {
    try {
      const products = await model.getAllProducts()
      res.status(200).send(products)
    } catch(err) {
      res.status(400).send({ message: 'Error requesting styles', error: err})
    }
  },

  getProductById: async (req, res) => {
    try {
      const productInfo = await model.getProduct(req.params.product_id)

      res.status(200).send(productInfo)
    } catch (err) {
      res.status(400).send({ message: 'Error requesting styles', error: err})
    }
  },

  getStylesById: async (req, res) => {
    try {
      const styles = await model.getProductStyles(req.params.product_id);
      res.status(200).send(styles)
    } catch (err) {
      res.status(400).send({ message: 'Error requesting styles', error: err})
    }
  },

  getRelatedProductsById: async (req, res) => {
    try {
      const relatedProducts = await model.getRelated(req.params.product_id)
      res.status(200).send(relatedProducts)
    } catch (err) {
      res.status(400).send({ message: 'Error requesting related products', error: err })
    }
  }
}
