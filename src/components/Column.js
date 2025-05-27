// src/components/Column.js
import React, { useState } from "react";
import Task from "./Task";
import "../style/Column.css";

const Column = ({ title, tasks, onAddTask, onEditTask, onDeleteTask, onMoveTask }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      // Create new task object
      const newTask = {
        title: newTaskTitle.trim(),
        description: newTaskDescription.trim(),
        status: title // Current column title becomes the status
      };
      
      onAddTask(newTask);
      
      // Reset form
      setNewTaskTitle('');
      setNewTaskDescription('');
      setIsAddingTask(false);
    }
  };

  const handleCancelAdd = () => {
    setNewTaskTitle('');
    setNewTaskDescription('');
    setIsAddingTask(false);
  };

  // Handle drag over (required for drop to work)
  const handleDragOver = (e) => {
    e.preventDefault(); // This allows the drop
    setIsDragOver(true);
  };

  // Handle drag leave
  const handleDragLeave = (e) => {
    // Only set to false if we're actually leaving the column
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const taskId = parseInt(e.dataTransfer.getData('text/plain'));
    if (taskId) {
      onMoveTask(taskId, title);
    }
  };

  return (
    <div 
      className={`column ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column-header">
        <h3>{title}</h3>
        <span className="task-count">({tasks.length})</span>
      </div>
      
      <div className="task-list">
        {tasks.map((task) => (
          <Task 
            key={task.id} 
            task={task} 
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onMove={onMoveTask}
          />
        ))}
        
        {tasks.length === 0 && !isDragOver && (
          <div className="empty-column">
            <p>No tasks yet</p>
            <p>Drag tasks here or add new ones!</p>
          </div>
        )}
        
        {isDragOver && (
          <div className="drop-zone">
            <p>Drop task here</p>
          </div>
        )}
      </div>

      {/* Add Task Section */}
      {isAddingTask ? (
        <div className="add-task-form">
          <input 
            type="text"
            placeholder="Task title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            autoFocus
          />
          <textarea 
            placeholder="Task description (optional)"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            rows="2"
          />
          <div className="form-buttons">
            <button onClick={handleAddTask} className="add-btn">
              Add Task
            </button>
            <button onClick={handleCancelAdd} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button 
          className="add-task-btn" 
          onClick={() => setIsAddingTask(true)}
        >
          + Add Task
        </button>
      )}
    </div>
  );
};

export default Column;