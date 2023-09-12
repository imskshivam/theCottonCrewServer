const express = require('express');
const cartRouter = express.Router();


cartRouter.post('/cart', (req, res) => {
    const { userId } = req.body;
    res.json(cart);
  });
  
  cartRouter.post('/cart/add', (req, res) => {
    const { productId, quantity } = req.body;
  
    // You should validate productId and quantity here
  
    // Add the product to the cart
    cart.push({ productId, quantity });
  
    res.json({ message: 'Product added to cart' });
  });
  
  cartRouter.delete('/cart/remove/:productId', (req, res) => {
    const productIdToRemove = req.params.productId;
  
    // Find the index of the product to remove
    const index = cart.findIndex((item) => item.productId === productIdToRemove);
  
    if (index !== -1) {
      cart.splice(index, 1);
      res.json({ message: 'Product removed from cart' });
    } else {
      res.status(404).json({ message: 'Product not found in cart' });
    }
  });

  module.exports = cartRouter;