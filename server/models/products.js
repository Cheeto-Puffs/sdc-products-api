require('dotenv')
const pool = require('../db.js')

module.exports = {
  getAllProducts: async (count=5, page=1) => {
  const query = 'SELECT * FROM products LIMIT $1';
  const queryArgs = [count]
  const products = await pool.query(query, queryArgs)
  return products.rows;
},

  getProduct: async (product_id) => {
    const query = {
      name: 'fetch-product',
      text: `SELECT json_build_object(
        'id', $1::integer,
        'campus', 'hr-rfp',
        'name', name,
        'slogan', slogan,
        'description', description,
        'category', category,
        'default_price', default_price,
        'features', (SELECT json_agg(json_build_object('feature', feature, 'value', value)) as features from features where product_id = $1::integer)
        )
        FROM products
        WHERE product_id = $1::integer;`,
        values: [product_id]
      }

    const productInfo = await pool.query(query)
    return productInfo.rows[0].json_build_object;
  },

  getProductStyles: async (product_id) => {
    const query = 'SELECT * FROM styles WHERE product_id = $1;'
    const queryArgs = [product_id]
    const styles = await pool.query(query, queryArgs)
    return styles.rows;
  },

  getRelated: async (product_id) => {
    console.log('WHO CAN RELATE !')
    const query = 'SELECT * FROM related WHERE product_id = $1;'
    const queryArgs = [product_id]
    const related = await pool.query(query, queryArgs)
    return related.rows;
  }
}