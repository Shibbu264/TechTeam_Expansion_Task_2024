const express = require('express');
const router = express.Router();
const Registration = require('../models/registration');

router.post('/register', async (req, res) => {
  try {
    const { name, branch, email, phone } = req.body;
    console.log('Received data:', { name, branch, email, phone }); 

    const newRegistration = new Registration({
      name,
      branch,
      email,
      phone,
    });

    const savedRegistration = await newRegistration.save();
    console.log('Saved to MongoDB:', savedRegistration);
    res.status(200).send('Registration successful!');
  } catch (error) {
    console.error('Error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      res.status(400).send(messages.join(', '));
    } else {
      res.status(500).send('Error registering user');
    }
  }
});

module.exports = router;