// src/components/Column.jsx
import React from 'react';
import Task from './Task';
import { useDrop } from 'react-dnd';

const Column = ({ status, tasks, moveTask }) => {
  const filteredTasks = tasks.filter(t => t.status === status);

  const titleMap = {
    todo: 'To Do',
    inprogress: 'In Progress',
    done: 'Done',
  };

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => {
      moveTask(item.id, status);
    },
    canDrop: (item) => item.status !== status,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const dropClass = isOver && canDrop ? 'column-drop-hover' : '';

  return (
    <div ref={drop} className={`column ${dropClass}`}>
      <h2>{titleMap[status]}</h2>
      {filteredTasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Column;