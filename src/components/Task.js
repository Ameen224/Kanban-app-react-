// src/components/Task.js
import React, { useState } from "react";
import "../Task.css";

const Task = ({ task, onEdit, onDelete, onMove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  // Handle saving edited task
  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim()
      });
      setIsEditing(false);
    }
  };

  // Handle canceling edit
  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  // Handle deleting task
  const handleDelete = () => {
    onDelete(task.id);
  };

  // Handle drag start
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', task.id.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  // If we're editing, show edit form
  if (isEditing) {
    return (
      <div className="task editing">
        <input 
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Task title"
        />
        <textarea 
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          placeholder="Task description"
          rows="2"
        />
        <div className="task-actions">
          <button onClick={handleSave} className="save-btn">
            Save
          </button>
          <button onClick={handleCancel} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // Normal task display
  return (
    <div 
      className="task" 
      draggable="true"
      onDragStart={handleDragStart}
    >
      <div className="task-drag-handle">⋮⋮</div>
      <div className="task-content">
        <h4>{task.title}</h4>
        {task.description && <p>{task.description}</p>}
      </div>
      
      <div className="task-actions">
        {/* Edit button */}
        <button 
          onClick={() => setIsEditing(true)} 
          className="edit-btn"
          title="Edit task"
        >
          ✏️
        </button>
        
        {/* Delete button */}
        <button 
          onClick={handleDelete} 
          className="delete-btn"
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default Task;