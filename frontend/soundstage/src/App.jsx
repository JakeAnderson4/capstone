/*
import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import Home from './pages/Home.jsx';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';





function App() {
  return (
    <Router>
      <div className="login-container">
        <h1>Login</h1>
        <form>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />

          <button type="submit">Login</button>
        </form>

        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}
*/
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;

