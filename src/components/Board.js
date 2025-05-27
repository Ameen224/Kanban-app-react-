// src/components/Board.js
import React from "react";
import Column from "./Column";
import "../style/Board.css";

const Board = ({ tasks, onAddTask, onEditTask, onDeleteTask, onMoveTask }) => {
  const columns = ["To Do", "In Progress", "Done"];

  return (
    <div className="board">
      {columns.map((columnTitle) => {
        // Filter tasks for this column
        const columnTasks = tasks.filter((task) => task.status === columnTitle);
        
        return (
          <Column
            key={columnTitle}
            title={columnTitle}
            tasks={columnTasks}
            onAddTask={onAddTask}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
            onMoveTask={onMoveTask}
          />
        );
      })}
    </div>
  );
};

export default Board;