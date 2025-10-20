import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path='/admin/dashboard' element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      } />
    </Routes>

  );
};

export default App;