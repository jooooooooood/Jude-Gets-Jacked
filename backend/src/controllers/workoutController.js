const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres", // Replace with your database username
  host: "localhost",
  database: "fitnessdb", // Replace with your database name
  password: "dbpassword", // Replace with your database password
  port: 5432,
});

exports.createWorkout = async (req, res) => {
  const { user_id, exercise, sets, reps, weight } = req.body;
  
  // SQL query to insert a new workout into the 'workouts' table
  const query = `
    INSERT INTO workouts (user_id, exercise, sets, reps, weight) 
    VALUES ($1, $2, $3, $4, $5) RETURNING *;
  `;

  try {
    const result = await pool.query(query, [user_id, exercise, sets, reps, weight]);
    res.status(201).json(result.rows[0]); // Returning the newly created workout
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUserWorkouts = async (req, res) => {
  const { user_id } = req.params;
  
  // SQL query to get all workouts for a specific user
  const query = `SELECT * FROM workouts WHERE user_id = $1;`;

  try {
    const result = await pool.query(query, [user_id]);
    res.status(200).json(result.rows); // Return all workouts for the user
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteWorkout = async (req, res) => {
  const { id, user_id } = req.body;
  
  // SQL query to delete a workout for a specific user
  const query = `DELETE FROM workouts WHERE id = $1 AND user_id = $2 RETURNING *;`;

  try {
    const result = await pool.query(query, [id, user_id]);
    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Workout deleted' });
    } else {
      res.status(404).json({ error: 'Workout not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
