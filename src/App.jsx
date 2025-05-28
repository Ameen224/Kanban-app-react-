// src/App.js
import React, { useState } from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import KanbanPage from "./Pages/Kanbanpage";
import "./style/App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(()=>{
    return localStorage.getItem("kanbanloggedIn")==="true"
  });
  const [isSignup, setIsSignup] = useState(false);
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("kanbanTasks");
    return saved ? JSON.parse(saved) : [];
  });

  const handleLogin = () => {setIsLoggedIn(true);
    localStorage.setItem("kanbanloggedIn","true")
  }

 const handleLogout = () => {
  setIsLoggedIn(false);
  localStorage.removeItem("kanbanLoggedIn");
};

  const handleAddTask = (newTask) => {
    const updatedTasks = [...tasks, { ...newTask, id: Date.now() }];
    setTasks(updatedTasks);
    localStorage.setItem("kanbanTasks", JSON.stringify(updatedTasks));
  };

  const handleEditTask = (taskId, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("kanbanTasks", JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("kanbanTasks", JSON.stringify(updatedTasks));
  };

  const handleMoveTask = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("kanbanTasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        isSignup ? (
          <Signup onSwitchToLogin={() => setIsSignup(false)} />
        ) : (
          <Login onLogin={handleLogin} onSwitchToSignup={() => setIsSignup(true)} />
        )
      ) : (
        <KanbanPage
          tasks={tasks}
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onMoveTask={handleMoveTask}
          onLogout={handleLogout} 

        />
      )}
    </div>
  );
}

export default App;
