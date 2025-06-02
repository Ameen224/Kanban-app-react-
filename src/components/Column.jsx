// src/components/Column.jsx
// ========================================

import React, { useState } from 'react';
import TaskCard from './Task';

const Column = ({ title, columnKey, tasks, moveTask, addTask, editTask, deleteTask }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      addTask(columnKey, newTask);
      setNewTask({ title: '', description: '' });
      setShowAddForm(false);
    }
  };

  const handleCancel = () => {
    setNewTask({ title: '', description: '' });
    setShowAddForm(false);
  };

  return (
    <div className="column">
      <div className="column-header">
        <h3>{title}</h3>
        <span className="task-count">{tasks.length}</span>
      </div>
      
      <div className="task-list">
        {tasks.length === 0 ? (
          <div className="empty-column">No tasks yet</div>
        ) : (
          tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              columnKey={columnKey}
              moveTask={moveTask}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          ))
        )}
      </div>

      {showAddForm ? (
        <div className="add-task-form">
          <form onSubmit={handleAddTask}>
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              autoFocus
            />
            <textarea
              placeholder="Task description"
              value={newTask.description}
              onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              rows="3"
            />
            <div className="form-buttons">
              <button type="submit" className="add-btn">Add Task</button>
              <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <button className="add-task-btn" onClick={() => setShowAddForm(true)}>
          + Add Task
        </button>
      )}
    </div>
  );
};

export default Column;