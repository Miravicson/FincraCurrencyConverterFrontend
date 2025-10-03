import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/globals.css';
import { Routes } from './routes/routes.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
);
