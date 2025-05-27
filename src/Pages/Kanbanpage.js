// src/Pages/Kanbanpage.js
import React from 'react';
import Board from '../components/Board';

function KanbanPage({ tasks, onAddTask, onEditTask, onDeleteTask, onMoveTask }) {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "1rem" }}>Kanban Board</h1>
      <Board 
        tasks={tasks}
        onAddTask={onAddTask}
        onEditTask={onEditTask}
        onDeleteTask={onDeleteTask}
        onMoveTask={onMoveTask}
      />
    </div>
  );
}

export default KanbanPage;
