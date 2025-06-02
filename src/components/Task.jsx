// src/components/TaskCard.jsx
// ========================================

import React, { useState } from 'react';

const TaskCard = ({ task, columnKey, moveTask, editTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ title: task.title, description: task.description });

  const handleSave = () => {
    if (editData.title.trim()) {
      editTask(columnKey, task.id, editData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditData({ title: task.title, description: task.description });
    setIsEditing(false);
  };

  const getAvailableActions = () => {
    const actions = [];
    
    if (columnKey !== 'todo') {
      actions.push({ label: '← To Do', action: () => moveTask(columnKey, 'todo', task.id) });
    }
    if (columnKey !== 'inProgress') {
      actions.push({ label: '→ In Progress', action: () => moveTask(columnKey, 'inProgress', task.id) });
    }
    if (columnKey !== 'done') {
      actions.push({ label: '✓ Done', action: () => moveTask(columnKey, 'done', task.id) });
    }
    
    return actions;
  };

  if (isEditing) {
    return (
      <div className="task editing">
        <div className="task-content">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({...editData, title: e.target.value})}
            autoFocus
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({...editData, description: e.target.value})}
            rows="2"
          />
          <div className="form-buttons">
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="task">
      <div className="task-drag-handle">⋮⋮</div>
      <div className="task-content">
        <h4>{task.title}</h4>
        {task.description && <p>{task.description}</p>}
        <div className="task-actions">
          {getAvailableActions().map((action, index) => (
            <button key={index} onClick={action.action} className="move-btn">
              {action.label}
            </button>
          ))}
          <button onClick={() => setIsEditing(true)} className="edit-btn">✏️</button>
          <button onClick={() => deleteTask(columnKey, task.id)} className="delete-btn">🗑️</button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

