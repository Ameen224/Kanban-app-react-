// src/Pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, loginUser, getRegisteredUsers } from '../utils/auth';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Validate email format
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Validate name length (minimum 3 letters)
  const validateName = (name) => {
    return name.trim().length >= 3;
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const numberPattern = /[0-9]/;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    else if (!uppercasePattern.test(password)) {
      return 'Password must contain at least one uppercase letter.';
    }
    else if (!lowercasePattern.test(password)) {
      return 'Password must contain at least one lowercase letter.';
    }
    else if (!numberPattern.test(password)) {
      return 'Password must contain at least one number.';
    }
    else if (!specialCharPattern.test(password)) {
      return 'Password must contain at least one special character.';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateName(formData.name)) {
      setError('Name must be at least 3 characters long.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const users = getRegisteredUsers();
    const userExists = users.some(user => user.email === formData.email);
    if (userExists) {
      setError('User already exists. Please login.');
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    registerUser(formData);
    loginUser({ email: formData.email, name: formData.name });
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="auth-container">
      <h2>Sign Up for Kanban Board</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="name"
          placeholder="Full Name" 
          value={formData.name}
          onChange={handleChange}
          required 
        />
        <input 
          type="email"
          name="email" 
          placeholder="Email" 
          value={formData.email}
          onChange={handleChange}
          required 
        />
        <input 
          type="password"
          name="password"
          placeholder="Password" 
          value={formData.password}
          onChange={handleChange}
          required 
        />
        <button type="submit">Sign Up</button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="auth-footer">
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Signup;
