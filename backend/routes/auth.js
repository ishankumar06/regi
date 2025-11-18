const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  const {
    username,
    email,
    password,
    branch,
    year,
    fatherName,
    motherName,
    hobby
  } = req.body;

  // Validate required fields
  if (!username || !email || !password || !branch || !year) {
    return res.status(400).json({ error: 'Please enter all required fields' });
  }

  try {
    // Check if user already exists by email or username
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save new user document
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      branch,
      year,
      fatherName,
      motherName,
      hobby
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
});

// GET user route by username (case-insensitive)
router.get('/user/:username', async (req, res) => {
  try {
    console.log('Looking for username:', req.params.username);
    const regex = new RegExp(`^${req.params.username}$`, 'i'); 
    const user = await User.findOne({ username: regex }).select('-password -__v');

    console.log('Query result:', user);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
