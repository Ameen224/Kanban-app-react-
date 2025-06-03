// src/components/Column.jsx
import React, { useState } from 'react';
import TaskCard from './Task';
import { useDrop } from 'react-dnd';

const Column = ({ title, columnKey, tasks, moveTask, addTask, editTask, deleteTask }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({ 
    title: '', 
    description: '', 
    priority: 'medium',
    dueDate: ''
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: 'TASK',
    drop: (draggedTask) => {
      moveTask(draggedTask.id, columnKey);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      addTask(columnKey, newTask);
      setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' });
      setShowAddForm(false);
    }
  };

  const handleCancel = () => {
    setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' });
    setShowAddForm(false);
  };

  return (
    <div 
      ref={dropRef}
      className={`column ${isOver ? 'drop-zone-active' : ''}`}
    >
      <div className="column-header">
        <h3>{title}</h3>
        <span className="task-count">{tasks.length}</span>
      </div>
      
      <div className="task-list">
        {tasks.length === 0 ? (
          <div className="empty-column">
            {isOver ? 'Drop task here' : 'No tasks yet'}
          </div>
        ) : (
          tasks.map((task, index) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              index={index}
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
              required
            />
            <textarea
              placeholder="Task description"
              value={newTask.description}
              onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              rows="2"
            />
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
            />
            <div className="form-buttons">
              <button type="submit" className="add-btn">Add Task</button>
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
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