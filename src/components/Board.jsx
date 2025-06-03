// src/components/Board.jsx
import React, { useState } from 'react';
import Column from './Column';

const initialData = {
  todo: [],
  inProgress: [],
  done: [],
};

const Board = () => {
  const [columns, setColumns] = useState(initialData);
  const [nextId, setNextId] = useState(1);

  const moveTask = (taskId, targetColumnId) => {
    setColumns(prevColumns => {
      let sourceColumnId = null;
      let taskToMove = null;
      
      for (const [columnId, tasks] of Object.entries(prevColumns)) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
          sourceColumnId = columnId;
          taskToMove = task;
          break;
        }
      }
      
      if (!taskToMove || sourceColumnId === targetColumnId) {
        return prevColumns;
      }
      
      return {
        ...prevColumns,
        [sourceColumnId]: prevColumns[sourceColumnId].filter(t => t.id !== taskId),
        [targetColumnId]: [...prevColumns[targetColumnId], taskToMove]
      };
    });
  };

  const addTask = (columnKey, taskData) => {
    const newTask = {
      id: nextId,
      ...taskData,
      createdAt: new Date().toISOString()
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