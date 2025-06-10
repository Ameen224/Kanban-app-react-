// src/routes/AppRoutes.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import Dashboard from '../Pages/Kanbanpage';
import TaskDetails from '../Pages/TaskDetail';
import AuthLayout from '../components/AuthLayout';
import GuestLayout from '../components/GuestLayout';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Guest-only routes */}
      <Route element={<GuestLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Authenticated routes */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/task/:id" element={<TaskDetails />} /> 
      </Route>
    </Routes>
  );
};

export default AppRoutes;
