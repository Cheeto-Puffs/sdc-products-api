const model = require('../models/products.js')
const cache = require('../cache/cache.js')

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
      // cache hit
      let key = `product:${req.params.product_id}`
      let cacheEntry = await cache.getFromCache(key);
      if (cacheEntry) {
        res.status(200).send({ ... cacheEntry, 'source' : 'cache' })
        return
      }

      // cache miss
      const productInfo = await model.getProduct(req.params.product_id)
      cache.setInCache(key, JSON.stringify(productInfo))
      res.status(200).send({... productInfo, 'source': 'DB'})
    } catch (err) {
      console.log(err)
      res.status(400).send({ message: 'Error requesting product by id', error: {err: err, message: err.message}})
    }
  },

  getStylesById: async (req, res) => {
    try {
      // cache hit
      let key = `product:${req.params.product_id}:style`
      const cacheEntry = await cache.getFromCache(key)
      if (cacheEntry) {
        res.status(200).send({...cacheEntry, 'source': 'cache'})
        return
      }

      // cache miss
      const styles = await model.getProductStyles(req.params.product_id);
      cache.setInCache(key, JSON.stringify(styles));
      res.status(200).send({...styles, 'source': 'DB'})
    } catch (err) {
      res.status(404).send({ message: 'Error requesting styles by id', error: {err: err, message: err.message}})
    }
  },

  getRelatedProductsById: async (req, res) => {
    try {
      let key = `product:${req.params.product_id}:related`
      const cacheEntry = await cache.getFromCache(key)
      if (cacheEntry) {
        res.status(200).send([...cacheEntry, 'cache'])
        return
      }

      const relatedProducts = await model.getRelated(req.params.product_id)
      cache.setInCache(key, JSON.stringify(relatedProducts));
      res.status(200).send([...relatedProducts, 'DB'])
    } catch (err) {
      res.status(400).send({ message: 'Error requesting related products by id', error: {err: err, message: err.message}})
    }
  }
}
