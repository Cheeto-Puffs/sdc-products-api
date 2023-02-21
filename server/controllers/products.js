const model = require('../models/products.js')
const redis = require('../cache/redis.js')

module.exports = {

  getProducts: async (req, res) => {
    try {
      const products = await model.getAllProducts()
      res.status(200).send(products)
    } catch(err) {
      res.status(400).send({ message: 'Error requesting styles', error: {err: err, message: err.message}})
    }
  },

  getProductById: async (req, res) => {
    try {
      // query the cache first if we find a result, return that result
      let cacheEntry = await redis.get(`product:${req.params.product_id}`)

      if (cacheEntry) {
        cacheEntry = JSON.parse(cacheEntry)
        res.status(200).send({ ... cacheEntry, 'source' : 'cache' })
        return
      }
      // otherwise we query the DB
      const productInfo = await model.getProduct(req.params.product_id)

      // store results in the cache before we send back to the client
      redis.set(`product:${req.params.product_id}`, JSON.stringify(productInfo))

      res.status(200).send({... productInfo, 'source': 'DB'})
    } catch (err) {
      console.log(err)
      res.status(400).send({ message: 'Error requesting product by id', error: {err: err, message: err.message}})
    }
  },

  getStylesById: async (req, res) => {
    try {
      const styles = await model.getProductStyles(req.params.product_id);
      res.status(200).send(styles)
    } catch (err) {
      res.status(404).send({ message: 'Error requesting styles by id', error: {err: err, message: err.message}})
    }
  },

  getRelatedProductsById: async (req, res) => {
    try {
      const relatedProducts = await model.getRelated(req.params.product_id)
      res.status(200).send(relatedProducts)
    } catch (err) {
      res.status(400).send({ message: 'Error requesting related products by id', error: {err: err, message: err.message}})
    }
  }
}
