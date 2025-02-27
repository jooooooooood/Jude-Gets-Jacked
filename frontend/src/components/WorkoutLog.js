import React, { useState, useEffect } from "react";
import workoutService from "../services/workoutService";

function WorkoutLog() {
  const [workouts, setWorkouts] = useState([]);
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const data = await workoutService.getWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  const handleAddWorkout = async (e) => {
    e.preventDefault();
    if (!exercise || !sets || !reps || !weight) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      await workoutService.addWorkout({ exercise, sets, reps, weight });
      fetchWorkouts();
      setExercise("");
      setSets("");
      setReps("");
      setWeight("");
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };

  const handleDeleteWorkout = async (id) => {
    try {
      await workoutService.deleteWorkout(id);
      fetchWorkouts();
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  return (
    <div>
      <h1>Workout Log</h1>
      <form onSubmit={handleAddWorkout}>
        <input
          type="text"
          placeholder="Exercise"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Weight (lbs)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <button type="submit">Add Workout</button>
      </form>

      <h2>Past Workouts</h2>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id}>
            {workout.exercise} - {workout.sets} sets x {workout.reps} reps @ {workout.weight} lbs
            <button onClick={() => handleDeleteWorkout(workout.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutLog;
