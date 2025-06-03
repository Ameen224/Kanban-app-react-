// src/Pages/Kanbanpage.jsx
import React, { useState } from 'react';
import Board from '../components/Board';
import { logoutUser, getUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 onClick={toggleDetails} className="clickable-title">
            Kanban Board {showDetails ? '▼' : '▶'}
          </h1>
          {showDetails && (
            <div className="app-details">
              <p>A powerful task management application built with React and drag-and-drop functionality.</p>
              <ul>
                <li>Create, edit, and delete tasks</li>
                <li>Drag and drop tasks between columns</li>
                <li>Track progress with To Do, In Progress, and Done columns</li>
                <li>User authentication and session management</li>
              </ul>
            </div>
          )}
        </div>
        <div className="user-info">
          <span>Welcome, {user?.name || user?.email}</span>
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