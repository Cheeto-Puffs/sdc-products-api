require('dotenv')
const pool = require('../db.js')
// require db connection here?

module.exports = {
  getAllProducts: async function () {
    // some db query
    return await pool.query('SELECT * FROM products LIMIT 10')
  },
}