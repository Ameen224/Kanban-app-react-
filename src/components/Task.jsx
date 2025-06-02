// src/components/Task.js
import React from 'react';

const TaskCard = ({ task, moveTask, from }) => {
  return (
    <div className="task-card">
      <p>{task.text}</p>
      <div className="actions">
        {from !== 'todo' && <button onClick={() => moveTask(from, 'todo', task.id)}>←</button>}
        {from !== 'inProgress' && <button onClick={() => moveTask(from, 'inProgress', task.id)}>→</button>}
        {from !== 'done' && <button onClick={() => moveTask(from, 'done', task.id)}>✓</button>}
      </div>
    </div>
  );
};

export default TaskCard;


