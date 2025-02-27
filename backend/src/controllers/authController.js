const User = require('../models/User');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Create a new user
    const newUser = await User.create({ username, password });
    res.status(201).json({ user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  console.log(req.body);  // Log request body to see what the frontend is sending

  const { username, password } = req.body;
  try {
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

