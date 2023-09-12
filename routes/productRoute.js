// productRoutes.js
const express = require('express');
const productRouter = express.Router();
const Product = require('../models/product'); 
const uploadImage=require('../services/uploadService');// Assuming the models.js file is in the parent directory

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


// productRouter.post('/products', async (req, res) => {
//   const { name, description, price, category } = req.body;

//   if (!name || !description || !price || !category) {
//     return res.status(400).json({ error: 'Name, description, price, and category are required' });
//   }

//   try {
//     const newProduct = new Product({
//       name,
//       description,
//       price,
//       category,
//     });
//     const savedProduct = await newProduct.save();
//     res.json(savedProduct);
//   } catch (err) {
//     res.status(500).json({ error: 'Error creating product' });
//   }
// });

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


// Route for adding a new product with an image upload
productRouter.post('/products', async (req, res) => {
  try {
    const { name, description, price, category, tags } = req.body;

    // Create a new product instance
    const product = new Product({ name, description, price, category, tags });

    // Check if images were uploaded
    if (req.files && req.files.length > 0) {
      const imageUrls = [];

      // Loop through the uploaded image files
      for (const file of req.files) {
        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(file.path);

        // Add the Cloudinary image URL to the array
        imageUrls.push(result.secure_url);
      }

      // Set the 'Images' field of the product with the array of image URLs
      product.Images = imageUrls;
    } else {
      return res.status(400).json({ error: 'Images not found in the request' });
    }

    // Save the product with the image URLs
    await product.save();

    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = productRouter;
