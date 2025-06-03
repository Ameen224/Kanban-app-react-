// src/utils/auth.js

export const isAuthenticated = () => {
  return !!localStorage.getItem('user');
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const loginUser = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
};

export const logoutUser = () => {
  localStorage.removeItem('user');
};

export const isUserRegistered = (email) => {
  const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  return users.some(user => user.email === email);
};

export const registerUser = (userData) => {
  const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  users.push(userData);
  localStorage.setItem('registeredUsers', JSON.stringify(users));
};
