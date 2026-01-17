import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/TeacherDashboard.css'; // Link your CSS file

const DashBoard = () => {
  console.log("Dashboard component loaded");
  
  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">Teacher Dashboard</h1>
      <div className="dashboard-cards">
        <Link to="/teacher/addstudent" className="dashboard-card">
          <span className="dashboard-icon">👨‍🎓</span>
          <span>Add Student</span>
        </Link>
        <Link to="/teacher/attendance-classlist" className="dashboard-card">
          <span className="dashboard-icon">📝</span>
          <span>Mark Attendance</span>
        </Link>
        <Link to="/teacher/subject" className="dashboard-card">
          <span className="dashboard-icon">📚</span>
          <span>Subjects</span>
        </Link>
        <Link to="/teacher/mark-fees" className="dashboard-card">
          <span className="dashboard-icon">💰</span>
          <span>Fees Status</span>
        </Link>
        <Link to="/teacher/view-mark" className="dashboard-card">
          <span className="dashboard-icon">📊</span>
          <span>View Marks</span>
        </Link>
        <Link to="/teacher/upload-material" className="dashboard-card">
          <span className="dashboard-icon">📤</span>
          <span>Upload Material</span>
        </Link>
        <Link to="/teacher/upload-file" className="dashboard-card">
          <span className="dashboard-icon">📤</span>
          <span>Upload Material</span>
        </Link>
      </div>
    </div>
  );
};

export default DashBoard;
