import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadTasks, saveTasks } from '../utils/storage';
import Header from '../components/Header';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  useEffect(() => {
    const tasks = loadTasks();
    const found = tasks.find((t) => t.id === id);
    setTask(found);
    setEditedTask(found ? {...found} : null);
    setIsLoading(false);
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTask({...task}); // Reset to original values
  };

  const handleUpdate = () => {
    if (!editedTask?.title.trim()) return;
    
    const tasks = loadTasks();
    const updated = tasks.map((t) => (t.id === id ? editedTask : t));
    saveTasks(updated);
    setTask(editedTask);
    setIsEditing(false); // Return to view mode
    // navigate('/'); // Remove this if you want to stay on the page
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (!task) return <div className="not-found">Task not found</div>;

  return (
    <div className="task-detail-page">
      <Header />
      <div className="task-detail-container">
        <h2>Task Details</h2>
        
        {!isEditing ? (
          // VIEW MODE
          <div className="view-mode">
            <div className="detail-item">
              <strong>Title:</strong>
              <p>{task.title}</p>
            </div>
            <div className="detail-item">
              <strong>Description:</strong>
              <p>{task.description || 'N/A'}</p>
            </div>
            <div className="detail-item">
              <strong>Due Date:</strong>
              <p>{task.dueDate || 'No date set'}</p>
            </div>
            <div className="detail-item">
              <strong>Category:</strong>
              <p>{task.category || 'Uncategorized'}</p>
            </div>
            <div className="detail-item">
              <strong>Status:</strong>
              <p>{task.status}</p>
            </div>
            <div className="button-group">
              <button className="edit-btn" onClick={handleEdit}>
                Edit Task
              </button>
              <button className="back-btn" onClick={() => navigate('/')}>
                Back to List
              </button>
            </div>
          </div>
        ) : (
          // EDIT MODE
          <div className="edit-mode">
            <div className="form-group">
              <label>Title*</label>
              <input
                name="title"
                value={editedTask.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={editedTask.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={editedTask.dueDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={editedTask.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="work">Work</option>
                <option value="study">Study</option>
                <option value="personal">Personal</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="button-group">
              <button className="update-btn" onClick={handleUpdate}>
                Save Changes
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetail;