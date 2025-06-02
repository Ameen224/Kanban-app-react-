// src/Pages/Kanbanpage.js
import React from 'react';
import Board from '../components/Board';
import { logoutUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <div>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
      <Board />
    </div>
  );
};

export default Dashboard;
