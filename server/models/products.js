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
        )
        FROM products
        WHERE product_id = $1::integer;`,
        values: [product_id]
      }

    const productInfo = await pool.query(query)
    return productInfo.rows[0].json_build_object;
  },

  getProductStyles: async (product_id) => {
    const query = {
      // name: 'fetch-styles',
      text: `SELECT json_build_object
      ('style_id', style_id,
      'name', name,
      'original_price', original_price,
      'sale_price', sale_price,
      'default?', default_style,
      'photos', (SELECT json_agg(json_build_object('thumbnail_url', thumbnail_url, 'url', url)) as photos FROM photos WHERE style_id = styles.style_id),
      'skus', (SELECT json_object_agg(sku_id, json_build_object('quantity', quantity, 'size', size)) as skus FROM skus WHERE style_id = styles.style_id))
      FROM styles
      WHERE product_id = $1;`,
      values: [product_id]
    }
    const styles = await pool.query(query)
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

// 47,12,"https://images.unsplash.com/photo-1516684810863-e49c82f1f092?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=965&q=80","https://images.unsplash.com/photo-1516684810863-e49c82f1f092?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"

// 48,12,"https://images.unsplash.com/photo-1490427712608-588e68359dbd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80","https://images.unsplash.com/photo-1490427712608-588e68359dbd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80

// 49,13,"https://images.unsplash.com/photo-1530073391204-7b34a1497281?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80","https://images.unsplash.com/photo-1530073391204-7b34a1497281?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"

// 50,13,"https://images.unsplash.com/photo-1482876555840-f31c5ebbff1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80","https://images.unsplash.com/photo-1482876555840-f31c5ebbff1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"


// //
// "https://images.unsplash.com/photo-1516684810863-e49c82f1f092?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80" | "https://images.unsplash.com/photo-1516684810863-e49c82f1f092?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=965&q=80"

// "https://images.unsplash.com/photo-1490427712608-588e68359dbd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80 | "https://images.unsplash.com/photo-1490427712608-588e68359dbd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"

// "https://images.unsplash.com/photo-1482876555840-f31c5ebbff1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80" | "https://images.unsplash.com/photo-1482876555840-f31c5ebbff1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"

// "https://images.unsplash.com/photo-1426647451887-5f2be01918a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" | "https://images.unsplash.com/photo-1426647451887-5f2be01918a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"

// WITH (FORMAT csv, HEADER true, NULL 'null', QUOTE E'\\');
// "\"https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80\""

// WITH (FORMAT csv, HEADER true, NULL 'null', QUOTE E'');


// {
//   "thumbnail_url" : "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//   "url" : "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
// }

// select json_agg(SELECT json_build_object ('style_id', style_id, 'name', name, 'original_price', original_price, 'sale_price', sale_price, 'default?', default_style, 'photos', (SELECT json_agg(json_build_object('thumbnail_url', thumbnail_url, 'url', url)) as photos FROM photos WHERE style_id = 240500)
// , 'skus', (SELECT json_object_agg(sku_id, json_build_object('quantity', quantity, 'size', size)) as skus FROM skus WHERE style_id = 1)) as 'results')
//       FROM styles
//       WHERE product_id = 1;
