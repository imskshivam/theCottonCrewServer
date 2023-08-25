// productRoutes.js
const express = require('express');
const productRouter = express.Router();
const Product = require('../models/product'); // Assuming the models.js file is in the parent directory

// Route to get all products
productRouter.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});


productRouter.get('/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching product' });
  }
});


productRouter.post('/products', async (req, res) => {
  const { name, description, price, category } = req.body;

  if (!name || !description || !price || !category) {
    return res.status(400).json({ error: 'Name, description, price, and category are required' });
  }

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
    });
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Error creating product' });
  }
});

// Route to update an existing product by ID
productRouter.put('/products/:id', async (req, res) => {
  const productId = req.params.id;
  const { name, description, price, category } = req.body;

  if (!name || !description || !price || !category) {
    return res.status(400).json({ error: 'Name, description, price, and category are required' });
  }

  try {
    const product = await Product.findByIdAndUpdate(productId, {
      name,
      description,
      price,
      category,
    }, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error updating product' });
  }
});

// Route to delete a product by ID
productRouter.delete('/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting product' });
  }
});

module.exports = productRouter;
