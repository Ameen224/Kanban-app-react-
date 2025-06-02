// src/components/Board.js
import React, { useState } from 'react';
import Column from './Column';

const initialData = {
  todo: [{ id: 1, text: 'Create task system' }],
  inProgress: [],
  done: [],
};

const Board = () => {
  const [columns, setColumns] = useState(initialData);

  const moveTask = (from, to, taskId) => {
    const task = columns[from].find(t => t.id === taskId);
    setColumns(prev => ({
      ...prev,
      [from]: prev[from].filter(t => t.id !== taskId),
      [to]: [...prev[to], task]
    }));
  };

  return (
    <div className="board">
      <Column title="Todo" tasks={columns.todo} moveTask={moveTask} from="todo" />
      <Column title="In Progress" tasks={columns.inProgress} moveTask={moveTask} from="inProgress" />
      <Column title="Done" tasks={columns.done} moveTask={moveTask} from="done" />
    </div>
  );
};

export default Board;
