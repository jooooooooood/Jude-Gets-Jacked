import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function LoginPage({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path if user was trying to access a protected route
  const from = location.state?.from?.pathname || "/workouts";

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }
    
    try {
      setLoading(true);
      setError("");
      
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });
      
      if (response.data.user) {
        // Save user in localStorage for persistence
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        // Update App state
        setUser(response.data.user);
        
        // Redirect to the workout log page or the page they were trying to access
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error("Login failed", err);
      setError(err.response?.data?.error || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Log In</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;