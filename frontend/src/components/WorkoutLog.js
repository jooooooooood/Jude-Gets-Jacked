import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"; // Use the new CSS

function WorkoutLog() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  // Get the user ID from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;

  useEffect(() => {
    if (userId) {
      fetchWorkouts();
    }
  }, [userId]);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/workouts/${userId}`);
      setWorkouts(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching workouts:", err);
      setError("Failed to load your workouts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddWorkout = async (e) => {
    e.preventDefault();
    
    if (!exercise || !sets || !reps || !weight) {
      setError("Please fill out all fields");
      return;
    }
    
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/workouts/create", {
        user_id: userId,
        exercise: exercise,
        sets: parseInt(sets),
        reps: parseInt(reps),
        weight: parseInt(weight)
      });
      
      // Clear form and update workouts list
      setExercise("");
      setSets("");
      setReps("");
      setWeight("");
      setError(null);
      fetchWorkouts();
    } catch (err) {
      console.error("Error adding workout:", err);
      setError("Failed to add workout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWorkout = async (id) => {
    try {
      setLoading(true);
      await axios.delete("http://localhost:5000/api/workouts/delete", {
        data: { id, user_id: userId }
      });
      setWorkouts(workouts.filter(workout => workout.id !== id));
    } catch (err) {
      console.error("Error deleting workout:", err);
      setError("Failed to delete workout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!userId) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div className="workout-container">
      <h1>Workout Log</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="workout-form">
        <h2>Add New Workout</h2>
        <form onSubmit={handleAddWorkout}>
          <div className="form-row">
            <input
              type="text"
              placeholder="Exercise Name"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="number"
              placeholder="Sets"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              min="1"
              required
            />
            <input
              type="number"
              placeholder="Reps"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              min="1"
              required
            />
            <input
              type="number"
              placeholder="Weight (lbs)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min="0"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="add-workout-btn"
          >
            {loading ? "Adding..." : "Add Workout"}
          </button>
        </form>
      </div>

      <div className="workout-list">
        <h2>Your Workouts</h2>
        {loading && <p>Loading workouts...</p>}
        {!loading && workouts.length === 0 && <p>No workouts yet. Add your first one above!</p>}
        
        {workouts.map((workout) => (
          <div key={workout.id} className="workout-item">
            <div className="workout-info">
              <strong>{workout.exercise}</strong>
              <p>{workout.sets} sets × {workout.reps} reps @ {workout.weight} lbs</p>
              <small>{new Date(workout.created_at).toLocaleString()}</small>
            </div>
            <div className="workout-actions">
              <button onClick={() => handleDeleteWorkout(workout.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkoutLog;