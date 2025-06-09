// src/components/AddForm


import React, { useState } from 'react';
import { loadTasks, saveTasks } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';

const TaskForm = ({ onTaskAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask = {
      id: uuidv4(),
      title,
      description: '',
      dueDate: '',
      category: '',
      status: 'todo',
      createdAt: new Date().toISOString(),
    };
    const updatedTasks = [...loadTasks(), newTask];
    saveTasks(updatedTasks);
    setTitle('');
    onTaskAdd();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;
