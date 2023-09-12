const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 

const productSchema = new mongoose.Schema({
  userId: { type: String, default: uuidv4 },
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  tags: [{ type: String }], // Use an array to store multiple tags
  Images: [{ type: String }], // Use an array to store multiple image URLs
  discountPercentage: { type: Number }, // Add discount percentage field
  offerValidUntil: { type: Date } // Add offer expiration date field
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
