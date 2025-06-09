// src/components/Task.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { loadTasks, saveTasks } from '../utils/storage';

const Task = ({ task, refreshTasks }) => {
  const handleDelete = () => {
    const updatedTasks = loadTasks().filter((t) => t.id !== task.id);
    saveTasks(updatedTasks);
    refreshTasks();
  };

  const statusColors = {
    todo: 'task-card todo-color',
    inprogress: 'task-card inprogress-color',
    done: 'task-card done-color',
  };

  return (
    <div className={statusColors[task.status]}>
      <span>{task.title}</span>
      <div className="task-actions">
        <Link to={`/task/${task.id}`}>
          <button>→</button>
        </Link>
        <button onClick={handleDelete}>✕</button>
      </div>
    </div>
  );
};

export default Task;