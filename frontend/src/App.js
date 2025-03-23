// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FormBuilder from './pages/FormBuilder';
import EditFormPage from './pages/EditFormPage';
import FormView from './pages/FormView';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-form" element={<FormBuilder />} />
        <Route path="/form/:id" element={<FormView />} />
        <Route path="/edit-form/:id" element={<EditFormPage />} />

      </Routes>
    </Router>
  );
}

export default App;
