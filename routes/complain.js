const express = require('express');
const complainRouter = express.Router();
const Complaint = require('../models/complain'); // Assuming your model is named 'Complaint'

// Create a new complaint
complainRouter.post('/registerComplain', (req, res) => {
  const { userId, subject, description } = req.body;

  const newComplaint = new Complaint({
    userId,
    subject,
    description,
  });

  newComplaint.save()
    .then((complaint) => { 
      res.status(201).json(complaint);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Unable to create a complaint.' });
    });
});
  // Retrieve all complaints
  complainRouter.get('/complaints', (req, res) => {
    Complaint.find()
      .then((complaints) => {
        res.json(complaints);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Unable to retrieve complaints.' });
      });
  });

  module.exports = complainRouter;