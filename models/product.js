const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 

const productSchema = new mongoose.Schema({
  productId: { type: String, default: uuidv4 },
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  category: { type:String },
  tags: [{ type: String }], // Use an array to store multiple tags
  Images: [{ type: String }], // Use an array to store multiple image URLs
  discountPercentage: { type: Number }, // Add discount percentage field
  offerValidUntil: { type: Date }, // Add offer expiration date field
  sizes: [{ type: String }], // Add size field (e.g., "Small", "Medium", "Large")
  color: [{ type: String }], // Add color field (e.g., "Red", "Blue", "Green")
  stock: { type: Number } // Add stock field (number of items available)
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

