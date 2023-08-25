// models.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
  tag : {type: String}
  
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
