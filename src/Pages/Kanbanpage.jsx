// src/pages/Dashboard.jsx

import React from 'react';
import Board from '../components/Board';
import { logoutUser, loginUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = loginUser();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Kanban Board</h1>
        <div className="user-info">
          <span>Welcome, {user?.email}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>
      <Board />
    </div>
  );
};

export default Dashboard;
