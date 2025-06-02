// src/components/Column.js
import React from 'react';
import TaskCard from './TaskCard';

const Column = ({ title, tasks, moveTask, from }) => {
  return (
    <div className="column">
      <h3>{title}</h3>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} moveTask={moveTask} from={from} />
      ))}
    </div>
  );
};

export default Column;
