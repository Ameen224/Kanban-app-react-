// src/components/Task.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { loadTasks, saveTasks } from '../utils/storage';

const Task = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDelete = () => {
    const updatedTasks = loadTasks().filter(t => t.id !== task.id);
    saveTasks(updatedTasks);
    // You can trigger a refresh in parent if needed, or use context/state lifting
    window.location.reload(); // quick fix, better to lift state
  };

  const statusColors = {
    todo: 'task-card todo-color',
    inprogress: 'task-card inprogress-color',
    done: 'task-card done-color',
  };

  return (
    <div
      ref={drag}
      className={statusColors[task.status]}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
    >
      <span>{task.title}</span>
      <div className="task-actions">
        <Link to={`/task/${task.id}`}>
          <button>→</button>
        </Link>
        <button onClick={handleDelete}>🗑️</button>
      </div>
    </div>
  );
};

export default Task;
