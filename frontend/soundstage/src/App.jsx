
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './pages/Home';
import SignupPage from './pages/Signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;

