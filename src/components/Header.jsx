//src/component/header

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser,getCurrentUser } from '../utils/auth';

const Header = () => {
  const navigate = useNavigate();
  const currentuser=getCurrentUser()

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <header className="header">
      <h1>Kanban Board</h1>
      <span>Welcome,{currentuser?.name||'User'}</span>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </header>
  );
};

export default Header;