// src/components/GuestLayout

import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const GuestLayout = () => {
  const [showMessage, setShowMessage] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    if (isAuthenticated()) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [location]);

  if (isAuthenticated()) {
    return (
      <div className="auth-message-container">
        {showMessage && (
          <div className="auth-message">
            User is logged in, can't access this page. Redirecting to dashboard...
          </div>
        )}
        <Navigate to="/" replace />
      </div>
    );
  }

  return <Outlet />;
};

export default GuestLayout;