import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import Login from './component/Auth/Login';
import Register from './component/Auth/Register';
import NotFound from './component/Student/UnKnownPage';

import StudentRoutes from './routes/StudentRoutes';
import TeacherRoutes from './routes/TeacherRoutes';
import AdminRoutes from './routes/AdminRoutes';
import ProtectedRoute from './routes/ProtectedRouter'; // ✅ Import it


function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

 
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          token 
            ? (role === 'student' ? <Navigate to="/student/dashboard" /> 
              : role === 'teacher' ? <Navigate to="/teacher/dashboard" /> 
              : <Navigate to="/admin/dashboard" />)
            : <Login />
        } />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Role-based routes */}
          <Route path="/student/*" element={<ProtectedRoute><StudentRoutes /></ProtectedRoute>} />
        <Route path="/teacher/*" element={<ProtectedRoute><TeacherRoutes /></ProtectedRoute>} />
        <Route path="/admin/*" element={<ProtectedRoute><AdminRoutes /></ProtectedRoute>} />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
