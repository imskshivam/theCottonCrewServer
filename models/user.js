// user.js
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String },
  phoneNumber: { type: String},
  address: { type: String},
  age: { type: Number },
  sex: { type: String, enum: ['Male', 'Female', 'Other']},
  wallet: { type: Number, default: 0 }, 
  accessToken : { type :String}// Assuming wallet balance starts at 0
});

// Create the User model from the schema
const user = mongoose.model('User', userSchema);

module.exports = user;
