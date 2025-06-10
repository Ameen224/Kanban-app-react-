import React, { useState } from 'react';
import { loadTasks, saveTasks } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';

const TaskForm = ({ onTaskAdd }) => {
  const [visible, setVisible] = useState(false); // form visibility state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
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

    const updatedTasks = [...loadTasks(), newTask];
    saveTasks(updatedTasks);

    // Clear fields
    setTitle('');
    setDescription('');
    setDueDate('');
    setCategory('');

    onTaskAdd();
    setVisible(false); // hide form after submit
  };

  const handleCancel = () => {
    setVisible(false);
    // Optionally clear inputs on cancel
    setTitle('');
    setDescription('');
    setDueDate('');
    setCategory('');
  };

  if (!visible) {
    return (
      <button className="show-form-btn" onClick={() => setVisible(true)}>
       Show Form
      </button>
    );
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="work">Work</option>
        <option value="study">Study</option>
        <option value="personal">Personal</option>
        <option value="other">Other</option>
      </select>

      <div className="form-buttons">
        <button type="submit" className="add-btn">Add Task</button>
        <button type="button" onClick={handleCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
