const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');

router.post('/create', workoutController.createWorkout);
router.get('/:user_id', workoutController.getUserWorkouts);
router.delete('/delete', workoutController.deleteWorkout); // Ensure this matches your frontend

module.exports = router;