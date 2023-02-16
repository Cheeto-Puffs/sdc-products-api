const mongoose = require('mongoose')
const db = mongoose.createConnection('mongodb://localhost:27017/products')
const { Schema } = mongoose;

const ProductsSchema = mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number
})

const StylesSchema = mongoose.Schema({
  style_id: Number,
  name: String,
  original_price: Number,
  sale_price: Number,
  default_style: Boolean,
  photos: Array,
  skus: Object,
  product_id: Number
})

const Products = db.model('Products', ProductsSchema)

const Styles = db.model('Styles', StylesSchema)

module.exports = {
  Products: Products,
  Styles: Styles,
}