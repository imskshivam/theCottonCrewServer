const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userID: { type: String,}, // User's ID associated with the cart
  products: [
    {
        productId: { type: String,},
        name: { type: String },
        description: { type: String },
        price: { type: Number },
        category: { type: String },
        tags: [{ type: String }], // Use an array to store multiple tags
        Images: [{ type: String }], // Use an array to store multiple image URLs
        discountPercentage: { type: Number }, // Add discount percentage field
        offerValidUntil: { type: Date }, // Add offer expiration date field
        sizes: [{ type: String }], // Add size field (e.g., "Small", "Medium", "Large")
        color: [{ type: String }],
        quantity: { type: Number, default: 1 }, // Quantity of the product in the cart
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
