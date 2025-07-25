// src/Pages/Kanbanpage.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import AddForm from '../components/AddForm';
import Board from '../components/Board';

const KanbanPage = () => {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div className="kanban-page">
      <Header />
      <Board key={refresh} />
      <AddForm onTaskAdd={triggerRefresh} />
    </div>
  );
};
export default KanbanPage;
