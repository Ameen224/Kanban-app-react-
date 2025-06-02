// utils/auth.js

export const isAuthenticated = () => {
  return !!localStorage.getItem('user');
};

export const loginUser = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
};

export const logoutUser = () => {
  localStorage.removeItem('user');
};
