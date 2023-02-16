const model = require('../models/products.js')
module.exports = {

  getProducts: function (req, res) {
    console.log('GOOD!')
    model.getAllProducts()
      .then((results) => {
        console.log(results.rows)
        res.status(200).json(results.rows)
        // res.sendStatus(200)
      })
      .catch(() => {
        console.log('BAD!')
        res.sendStatus(404)
      })
    },

  getProductById: function (req, res) {
    model.getProduct(req.params.product_id)
      .then((results) => {
        console.log(results.rows[0])
        res.sendStatus(200)
      })
      .catch(() => {
        console.log('BAD!')
        res.sendStatus(404)
      })
  },

  getStylesById: async (req, res) => {
    try {
      const styles = await model.getProductStyles(req.params.product_id);
      res.status(200).send(styles)
    } catch (err) {
      res.status(400).send({ message: 'Error requesting styles', error: err})
    }
  }
}
