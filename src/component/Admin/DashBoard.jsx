import React from 'react';
import '../../style/AdminDashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Welcome Admin</h1>
      <div className="card-container">
        <div className="card">Total Students: 120</div>
        <div className="card">Total Teachers: 10</div>
        <div className="card">Subjects: 15</div>
      </div>
    </div>
  );
};

export default Dashboard;
