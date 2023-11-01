const express = require('express');
const userRouter = express.Router();
const User = require('../models/user'); 


// Create a new user
userRouter.post('/newUser', async (req, res) => {
    try {
      const user = new User(req.body);
      const savedUser = await user.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Get all users
  userRouter.get('/getAllUser', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get a user by ID
 
userRouter.post('/getUserById', async (req, res) => {
    try {
        // Extract the accessToken and userId from the request body
        const { accessToken, userId } = req.body;

        // Validate the accessToken (you should implement your validation logic here)
      
        // Find the user by userId using findOne with a query on the custom userId field
        const user = await User.findOne({ userId,accessToken});

        if (!user) {
            res.status(404).json({ error: 'User not found or invalid access token' });
        } else {
            res.status(200).json(user);
        }
       
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


 // Update a user by ID
userRouter.put('/updateUserById', async (req, res) => {
  try {
    const { phoneNumber, accessToken } = req.body;

    // Ensure that at least one field to update is present in the request
   

    // Find the user by ID
    const user = await User.findOne({ accessToken });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Update the user's fields that are provided in the request body
    user.phoneNumber=phoneNumber;

    // Save the updated user
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


  module.exports = userRouter;