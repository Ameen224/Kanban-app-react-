// === src/Pages/TaskDetail.jsx ===
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadTasks, saveTasks } from '../utils/storage';
import Header from '../components/Header';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const tasks = loadTasks();
    const found = tasks.find((t) => t.id === id);
    if (found) setTask(found);
  }, [id]);

  const handleUpdate = () => {
    const tasks = loadTasks();
    const updated = tasks.map((t) => (t.id === id ? task : t));
    saveTasks(updated);
    navigate('/');
  };

  if (!task) return <p>Task not found</p>;

  return (
    <div>
      <Header />
      <div className="task-detail">
        <input value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} />
        <textarea value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} />
        <input type="date" value={task.dueDate} onChange={(e) => setTask({ ...task, dueDate: e.target.value })} />
        <input value={task.category} onChange={(e) => setTask({ ...task, category: e.target.value })} />
        <button onClick={handleUpdate}>Update</button>
        <button onClick={() => navigate('/')}>Back</button>
      </div>
    </div>
  );
};

export default TaskDetail;