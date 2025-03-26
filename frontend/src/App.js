import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignUpPage";
import WorkoutLog from "./components/WorkoutLog";
import "./App.css";

function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("user");
  const location = useLocation();
  
  if (!isAuthenticated) {
    // Redirect to login but save the page they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    // Effect to handle auth state changes
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="navbar-brand">
            <Link to="/">Jude Gets Jacked</Link>
          </div>
          <div className="navbar-links">
            {!user ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            ) : (
              <>
                <Link to="/workouts">Workout Log</Link>
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/workouts"
              element={
                <ProtectedRoute>
                  <WorkoutLog />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to={user ? "/workouts" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;