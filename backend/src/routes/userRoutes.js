const express = require('express');
const router = express.Router();
const { getUserById } = require('../controllers/userController');

// Route to get user by ID
router.get('/api/users/:id', getUserById);

module.exports = router;
