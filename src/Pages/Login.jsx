// src/Pages/Login.js
import React, { useState } from 'react';

function Login({ onLogin, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Get user data from localStorage
    const savedUser = localStorage.getItem('kanbanUser');
    
    if (savedUser) {
      const user = JSON.parse(savedUser);
      
      // Check if email and password match
      if (user.email === email && user.password === password) {
        setError('');
        onLogin(); // Call the function to switch to kanban page
      } else {
        setError('Wrong email or password!');
      }
    } else {
      setError('No user found. Please sign up first.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        
        <input 
          type="email"
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        
        <input 
          type="password"
          placeholder="Enter your password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        
        {error && <div className="error-message">{error}</div>}
        
        <button onClick={handleLogin}>Login</button>
        
        <p>
          Don't have an account? 
          <button className="link-btn" onClick={onSwitchToSignup}>
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;