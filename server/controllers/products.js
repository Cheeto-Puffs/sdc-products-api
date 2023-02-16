const model = require('../models/products.js')
module.exports = {

  get: function (req, res) {
    if (req) {
      console.log('GOOD!')
      model.getAllProducts()
        .then((results) => {
          console.log(results.rows)
        })
      res.sendStatus(200)
    } else {
      console.log('BAD!')
      res.sendStatus(404)
    }
  },
}