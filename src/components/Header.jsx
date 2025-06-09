import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../utils/auth';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <header className="header">
      <h1>Kanban Board</h1>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </header>
  );
};

export default Header;