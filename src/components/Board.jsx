// src/components/Board.jsx

import React, { useState } from 'react';
import Column from './Column';

const initialData = {
  todo: [
    { id: 1, title: 'Create task system', description: 'Build a complete kanban board' },
    { id: 2, title: 'Setup authentication', description: 'Implement login and signup' }
  ],
  inProgress: [
    { id: 3, title: 'Design UI components', description: 'Create beautiful task cards' }
  ],
  done: [
    { id: 4, title: 'Project setup', description: 'Initialize React project with routing' }
  ],
};

const Board = () => {
  const [columns, setColumns] = useState(initialData);
  const [nextId, setNextId] = useState(5);

  const moveTask = (from, to, taskId) => {
    const task = columns[from].find(t => t.id === taskId);
    if (task) {
      setColumns(prev => ({
        ...prev,
        [from]: prev[from].filter(t => t.id !== taskId),
        [to]: [...prev[to], task]
      }));
    }
  };

  const addTask = (columnKey, taskData) => {
    const newTask = {
      id: nextId,
      title: taskData.title,
      description: taskData.description
    };
    
    setColumns(prev => ({
      ...prev,
      [columnKey]: [...prev[columnKey], newTask]
    }));
    
    setNextId(prev => prev + 1);
  };

  const editTask = (columnKey, taskId, updatedTask) => {
    setColumns(prev => ({
      ...prev,
      [columnKey]: prev[columnKey].map(task =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    }));
  };

  const deleteTask = (columnKey, taskId) => {
    setColumns(prev => ({
      ...prev,
      [columnKey]: prev[columnKey].filter(task => task.id !== taskId)
    }));
  };

  return (
    <div className="board">
      <Column 
        title="To Do" 
        columnKey="todo"
        tasks={columns.todo} 
        moveTask={moveTask}
        addTask={addTask}
        editTask={editTask}
        deleteTask={deleteTask}
      />
      <Column 
        title="In Progress" 
        columnKey="inProgress"
        tasks={columns.inProgress} 
        moveTask={moveTask}
        addTask={addTask}
        editTask={editTask}
        deleteTask={deleteTask}
      />
      <Column 
        title="Done" 
        columnKey="done"
        tasks={columns.done} 
        moveTask={moveTask}
        addTask={addTask}
        editTask={editTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default Board;