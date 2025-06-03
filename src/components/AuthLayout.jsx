// src/components/AuthLayout.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const AuthLayout = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthLayout;