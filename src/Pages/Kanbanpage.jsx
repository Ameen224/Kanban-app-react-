// src/Pages/Kanbanpage.js
import React from 'react';
import Board from '../components/Board';

function KanbanPage({ tasks, onAddTask, onEditTask, onDeleteTask, onMoveTask,onLogout }) {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "1rem" }}>Kanban Board</h1>
       <button onClick={onLogout}>click here to logout</button>
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
