// src/Pages/Signup.js
import React, { useState } from 'react';

function Signup({ onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSignup = () => {
    // Simple validation
    if (!email || !password || !confirmPassword) {
      setMessage('Please fill all fields');
      setIsError(true);
      return;
    }
    
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setIsError(true);
      return;
    }
    
    if (password.length < 4) {
      setMessage('Password must be at least 4 characters');
      setIsError(true);
      return;
    }

    // Save user to localStorage
    const newUser = { email, password };
    localStorage.setItem('kanbanUser', JSON.stringify(newUser));
    
    setMessage('Account created successfully! You can now login.');
    setIsError(false);
    
    // Auto switch to login after 2 seconds
    setTimeout(() => {
      onSwitchToLogin();
    }, 2000);
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Create Account</h2>
        
        <input 
          type="email"
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        
        <input 
          type="password"
          placeholder="Enter password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        
        <input 
          type="password"
          placeholder="Confirm password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
        />
        
        {message && (
          <div className={isError ? "error-message" : "success-message"}>
            {message}
          </div>
        )}
        
        <button onClick={handleSignup}>Create Account</button>
        
        <p>
          Already have an account? 
          <button className="link-btn" onClick={onSwitchToLogin}>
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;