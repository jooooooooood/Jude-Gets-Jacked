import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignUpPage";
import WorkoutLog from "./components/WorkoutLog";

function App() {
  const isAuthenticated = !!localStorage.getItem("user");  // Check if user exists in localStorage

  return (
    <Router>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        {isAuthenticated && <Link to="/workouts">Workout Log</Link>}
      </nav>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/workouts"
          element={isAuthenticated ? <WorkoutLog /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
