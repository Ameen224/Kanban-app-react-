// src/components/AddForm.jsx


import React, { useState } from 'react';
import { loadTasks, saveTasks } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';

const TaskForm = ({ onTaskAdd }) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!title.trim()) return;

  const newTask = {
    id: uuidv4(),
    title,
    description,
    dueDate,
    category,
    status: 'todo',
    createdAt: new Date().toISOString(),
  };

  const existingTasks = await loadTasks(); // ✅ Await here
  const updatedTasks = [...existingTasks, newTask];

  await saveTasks(updatedTasks); // ✅ Await here too if saveTasks is async

  // Clear fields
  setTitle('');
  setDescription('');
  setDueDate('');
  setCategory('');

  onTaskAdd();
  setVisible(false);
};


  const handleCancel = () => {
    setVisible(false);
    setTitle('');
    setDescription('');
    setDueDate('');
    setCategory('');
  };

  if (!visible) {
    return (
      <button className="show-form-btn" onClick={() => setVisible(true)}>
        + Add New Task
      </button>
    );
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Task Title*</label>
        <input
          id="title"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Last Date</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="work">Work</option>
          <option value="study">Study</option>
          <option value="personal">Personal</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-buttons">
        <button type="submit" className="add-btn">
          Add Task
        </button>
        <button type="button" onClick={handleCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;