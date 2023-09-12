const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 

const productSchema = new mongoose.Schema({
  userId: { type: String, default: uuidv4 },
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
  tags: [{ type: String }], // Use an array to store multiple tags
  Image: { type: String }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
