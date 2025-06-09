// src/components/Board.jsx

import React, { useState, useEffect } from 'react';
import Column from './Column';
import { loadTasks } from '../utils/storage';

const Board = () => {
  const [tasks, setTasks] = useState([]);

  const refreshTasks = () => setTasks(loadTasks());

  useEffect(() => {
    refreshTasks();
  }, []);

  return (
    <div className="board">
      <Column status="todo" tasks={tasks} refreshTasks={refreshTasks} />
      <Column status="inprogress" tasks={tasks} refreshTasks={refreshTasks} />
      <Column status="done" tasks={tasks} refreshTasks={refreshTasks} />
    </div>
  );
};

export default Board;