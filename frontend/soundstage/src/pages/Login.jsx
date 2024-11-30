// src/pages/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Login from './components/LoginForm.jsx'

const Login = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email); // Simulates signing in
    navigate("/home"); // Redirect to Home
  };

  return (
   <Loginform />
  );
};

export default Login;
