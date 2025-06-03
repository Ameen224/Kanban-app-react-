// src/components/Task.jsx
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const TaskCard = ({ task, columnKey, index, moveTask, editTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ 
    title: task.title, 
    description: task.description,
    priority: task.priority || 'medium',
    dueDate: task.dueDate || ''
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: 'TASK',
    item: { ...task, index, columnKey },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleSave = () => {
    if (editData.title.trim()) {
      editTask(columnKey, task.id, editData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditData({ 
      title: task.title, 
      description: task.description,
      priority: task.priority || 'medium',
      dueDate: task.dueDate || ''
    });
    setIsEditing(false);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#ff4444';
      case 'medium': return '#ffaa00';
      case 'low': return '#44ff44';
      default: return '#ffaa00';
    }
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
          <select
            value={editData.priority}
            onChange={(e) => setEditData({...editData, priority: e.target.value})}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            value={editData.dueDate}
            onChange={(e) => setEditData({...editData, dueDate: e.target.value})}
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
    <div 
      ref={dragRef}
      className="task"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="task-drag-handle">⋮⋮</div>
      <div className="task-content">
        <div className="task-header">
          <h4>{task.title}</h4>
          <div 
            className="priority-indicator"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
            title={`${task.priority} priority`}
          ></div>
        </div>
        {task.description && <p>{task.description}</p>}
        {task.dueDate && (
          <div className="task-due-date">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
        <div className="task-actions">
          <button onClick={() => setIsEditing(true)} className="edit-btn">✏️</button>
          <button onClick={() => deleteTask(columnKey, task.id)} className="delete-btn">🗑️</button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;