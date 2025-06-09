// === src/utils/storage.js ===
import { getCurrentUser } from './auth';

export const loadTasks = () => {
  const user = getCurrentUser();
  if (!user) return [];
  return JSON.parse(localStorage.getItem(`tasks_${user.email}`) || '[]');
};

export const saveTasks = (tasks) => {
  const user = getCurrentUser();
  if (!user) return;
  localStorage.setItem(`tasks_${user.email}`, JSON.stringify(tasks));
};