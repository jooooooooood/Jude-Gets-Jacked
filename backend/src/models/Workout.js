const db = require('../utils/db');

class Workout {
  static async create({ user_id, exercise, sets, reps, weight }) {
    const result = await db.query(
      'INSERT INTO workouts (user_id, exercise, sets, reps, weight) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user_id, exercise, sets, reps, weight]
    );
    return result.rows[0];
  }

  static async findByUser(user_id) {
    const result = await db.query('SELECT * FROM workouts WHERE user_id = $1', [user_id]);
    return result.rows;
  }

  static async delete(id, user_id) {
    await db.query('DELETE FROM workouts WHERE id = $1 AND user_id = $2', [id, user_id]);
  }
}

module.exports = Workout;
