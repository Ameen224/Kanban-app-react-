// src/App.js
import React, { useState } from "react";
import Board from "./components/Board";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState('login'); // 'login', 'signup', 'kanban'
  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn React", description: "Study React basics", status: "To Do" },
    { id: 2, title: "Build Kanban", description: "Create this app", status: "In Progress" },
    { id: 3, title: "Setup Project", description: "Initial setup done", status: "Done" },
  ]);

  // Add new task
  const addTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: Date.now() // Simple ID generation using timestamp
    };
    setTasks([...tasks, taskWithId]);
  };

  // Edit existing task
  const editTask = (id, updates) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...updates } : task
    );
    setTasks(updatedTasks);
  };

  // Delete task
  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    }
  };

  // Move task between columns
  const moveTask = (id, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  // Handle login
  const handleLogin = () => {
    setCurrentPage('kanban');
  };

  // Handle logout
  const handleLogout = () => {
    setCurrentPage('login');
  };

  // Switch between login and signup
  const switchToSignup = () => setCurrentPage('signup');
  const switchToLogin = () => setCurrentPage('login');

  // Render different pages based on current state
  if (currentPage === 'login') {
    return <Login onLogin={handleLogin} onSwitchToSignup={switchToSignup} />;
  }

  if (currentPage === 'signup') {
    return <Signup onSwitchToLogin={switchToLogin} />;
  }

  // Kanban page
  return (
    <div className="App">
      <header className="kanban-header">
        <h1>My Kanban Board</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>
      <Board 
        tasks={tasks} 
        onAddTask={addTask}
        onEditTask={editTask}
        onDeleteTask={deleteTask}
        onMoveTask={moveTask}
      />
    </div>
  );
}

export default App;