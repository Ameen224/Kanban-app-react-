// src/utils/auth.js

export const registerUser = (userData) => {
  const users = JSON.parse(localStorage.getItem('kanban-users')) || [];
  users.push(userData);
  localStorage.setItem('kanban-users', JSON.stringify(users));
};

export const loginUser = (user) => {
  localStorage.setItem('kanban-current-user', JSON.stringify(user));
};

export const logoutUser = () => {
  localStorage.removeItem('kanban-current-user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('kanban-current-user'));
};

export const isAuthenticated = () => {
  return !!getCurrentUser();
};

export const getRegisteredUsers = () => {
  return JSON.parse(localStorage.getItem('kanban-users')) || [];
};