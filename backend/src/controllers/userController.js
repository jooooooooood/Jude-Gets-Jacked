const User = require('../models/User');

exports.getUserById = async (req, res) => {
  const { id } = req.params; // Extract ID from URL
  try {
    const user = await User.findById(id); // Call the model method to find the user by ID
    if (!user) {
      return res.status(404).json({ error: 'User not found' }); // If user not found, return 404
    }
    res.status(200).json(user); // Return the user data in the response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' }); // Handle any server errors
  }
};
