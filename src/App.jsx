// src/App.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './style/App.css';

const App = () => {
  return (
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <AppRoutes />
      </DndProvider>
    </BrowserRouter>
  );
};

// Mount the app to the root div
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
