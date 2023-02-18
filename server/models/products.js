require('dotenv')
const pool = require('../db.js')

module.exports = {
  getAllProducts: async (count=10, page=1) => {
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
        ) as data
        FROM products
        WHERE product_id = $1::integer;`,
        values: [product_id]
      }

    const productInfo = await pool.query(query)
    return productInfo.rows[0].data;
  },

  getProductStyles: async (product_id) => {
    const query = {
      name: 'fetch-styles',
      text: `select json_build_object(
        'product_id', product_id::varchar,
        'results', (
          select json_agg(
            json_build_object
                ('style_id', style_id,
                'name', name,
                'original_price', original_price,
                'sale_price', sale_price,
                'default?', default_style,
                'photos', (SELECT json_agg(json_build_object('thumbnail_url', thumbnail_url, 'url', url)) as photos FROM photos WHERE style_id = styles.style_id),
                'skus', (SELECT json_object_agg(sku_id, json_build_object('quantity', quantity, 'size', size)) as skus FROM skus WHERE style_id = styles.style_id)))
        )
      ) as data
      FROM styles
      WHERE product_id = $1
      GROUP BY product_id;`,
      values: [product_id]
    }
    const styles = await pool.query(query)
    return styles.rows[0].data;
  },

  getRelated: async (product_id) => {
    const query = {
      text: 'select coalesce(array_agg(related_id), ARRAY[]::integer[]) as data from related where product_id = $1;',
      values: [product_id]
    }
    const related = await pool.query(query)
    return related.rows[0].data;
  }
}
