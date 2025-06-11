// src/components/Board.jsx

import React, { useState, useEffect } from 'react';
import Column from './Column';
import { loadTasks, saveTasks } from '../utils/storage';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Board = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  const moveTask = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board">
        <Column status="todo" tasks={tasks} moveTask={moveTask} />
        <Column status="inprogress" tasks={tasks} moveTask={moveTask} />
        <Column status="done" tasks={tasks} moveTask={moveTask} />
      </div>
    </DndProvider>
  );
};

export default Board;