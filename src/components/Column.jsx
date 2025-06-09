// src/components/Column.jsx

import React from 'react';
import Task from './Task';

const Column = ({ status, tasks, refreshTasks }) => {
  const filteredTasks = tasks.filter((t) => t.status === status);
  const titleMap = {
    todo: 'To Do',
    inprogress: 'In Progress',
    done: 'Done',
  };

  return (
    <div className="column">
      <h2>{titleMap[status]}</h2>
      {filteredTasks.map((task) => (
        <Task key={task.id} task={task} refreshTasks={refreshTasks} />
      ))}
    </div>
  );
};

export default Column;