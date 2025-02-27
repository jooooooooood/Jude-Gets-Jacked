const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 5000;

// ============ MIDDLEWARE ============ //
app.use(cors()); // Enables CORS for all origins (allows frontend to make requests)
app.use(express.json()); // Parses incoming JSON requests

// ============ DATABASE CONNECTION ============ //
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "fitnessdb",
  password: "dbpassword",
  port: 5432,
});

// ============ DATABASE SETUP ============ //
const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS workouts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        exercise VARCHAR(100) NOT NULL,
        sets INTEGER NOT NULL,
        reps INTEGER NOT NULL,
        weight INTEGER NOT NULL
      );
    `);
    console.log("Database tables are ready.");
  } catch (err) {
    console.error("Error creating tables:", err);
  }
};
createTables();

// ============ ROUTES ============ //
const authController = require("./controllers/authController");
const workoutRoutes = require("./routes/workoutRoutes");

app.post("/api/auth/register", authController.register);
app.post("/api/auth/login", authController.login);
app.use("/api/workouts", workoutRoutes);

// ============ TEST ROUTE ============ //
app.get("/", (req, res) => {
  res.send("Hello, your server is up and running!");
});

// ============ START SERVER ============ //
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
