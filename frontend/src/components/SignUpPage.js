import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Added to navigate after successful sign-up

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To handle error messages
  const navigate = useNavigate(); // To redirect user after successful sign-up

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending request to the backend to register the user
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
      });

      // On successful registration, navigate to login page
      alert("User created successfully!");
      navigate("/login");
    } catch (error) {
      setError("Error creating user: " + error.response?.data?.error || "Unknown error");
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message if any */}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpPage;
