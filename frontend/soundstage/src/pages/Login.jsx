// src/pages/Login.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  // Define the onLogin function
  const onLogin = async (email, password) => {
    console.log("onLogin called with:", email, password); // Log the email and password for debugging

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("Fetch response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful, token received:", data.token);
        signIn(data.token); // Store the token using the AuthContext
        navigate("/home"); // Navigate to the Home page
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        alert(errorData.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  // Pass the onLogin function to LoginForm
  return <LoginForm onLogin={onLogin} />;
};

export default Login;
