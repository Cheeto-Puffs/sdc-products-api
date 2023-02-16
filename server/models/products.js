require('dotenv')
const pool = require('../db.js')

module.exports = {
  getAllProducts: function (count=5, page=1) {
  return pool.query('SELECT * FROM products LIMIT $1', [count]);
  },

  getProduct: function (product_id) {
    return pool.query('SELECT * FROM products WHERE product_id = $1', [product_id])
  },

  getProductStyles: async (product_id) => {
    const query = 'SELECT * FROM styles WHERE product_id = $1;'
    const args = [product_id]
    const styles = await pool.query(query, args)
    return styles.rows;
  },
}