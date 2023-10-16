const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // User's ID submitting the complaint
    subject: { type: String, required: true }, // Subject of the complaint
    description: { type: String, required: true }, // Description of the complaint
    createdAt: { type: Date, default: Date.now }, // Date when the complaint was created
  });
  
  const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;

