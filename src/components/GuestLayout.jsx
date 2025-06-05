// src/components/GuestLayout.jsx
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const GuestLayout = () => {
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
        navigate('/', { replace: true }); 
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [navigate]);

  if (isAuthenticated()) {
    return (
      <div className="auth-message-container">
        {showMessage && (
          <div className="auth-message">
            You are already logged in. Redirecting to dashboard...
          </div>
        )}
      </div>
    );
  }

  return <Outlet />;
};

export default GuestLayout;
