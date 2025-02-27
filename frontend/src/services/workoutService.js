import axios from "axios";

const API_URL = "http://localhost:5000/api/workouts";

const getWorkouts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const addWorkout = async (workout) => {
  try {
    const response = await axios.post("http://localhost:5000/api/workouts/create", workout);
    console.log("Workout added:", response.data);
  } catch (error) {
    console.error("Error adding workout:", error);
  }
};

const deleteWorkout = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export default {
  getWorkouts,
  addWorkout,
  deleteWorkout,
};
