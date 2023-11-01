const express = require('express');
const cartRouter = express.Router();
const Cart = require('../models/cart');
const User = require('../models/user');  

// Define a route to handle POST requests to the cart
cartRouter.post('/add', async (req, res) => {
  try {
    // Extract data from the request body
    const { userId, productData,accessToken } = req.body;

    // Create a new cart entry
    const newCart = new Cart({
      userID: userId,
      products: productData,
    });

    // Save the new cart entry to the database
    const savedCart = await newCart.save();

    res.status(201).json(savedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not add the item to the cart' });
  }
});
// Add a new route to get all cart data
cartRouter.get('/', async (req, res) => {
  try {
    const accessToken = req.headers['x-auth-token']; // Assuming the access token is provided in the "Authorization" header

    if (!accessToken) {
      res.status(401).json({ error: 'Access token is missing' });
      return;
    }

   
    const user = await User.findOne({accessToken});
    console.log(user);
    if (user==null) {
      return res.status(200).json("No user Found")
    }
    const userId = user.userId;
    console.log(userId);
    const cart = await Cart.findOne({userId});
    console.log(cart);

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not retrieve cart data' });
  }
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