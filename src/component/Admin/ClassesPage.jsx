import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaPlusCircle, FaUserTie, FaUpload } from 'react-icons/fa';
import '../../style/ClassesPage.css';

const ClassesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="classes-container">
      <h2 className="page-title">Classes Dashboard</h2>

      <div className="summary-widgets">
        <div className="widget">
          <h3>5</h3>
          <p>Classes Today</p>
        </div>
        <div className="widget">
          <h3>3</h3>
          <p>Unassigned Classes</p>
        </div>
        <div className="widget">
          <h3>8</h3>
          <p>Total Teachers</p>
        </div>
      </div>

      <div className="feature-grid">
        <div className="feature-card" onClick={() => navigate('/admin/timetable/today')}>
          <FaCalendarAlt className="feature-icon" />
          <h4>Today Timetable</h4>
          <p>View today's class schedule.</p>
        </div>

        <div className="feature-card" onClick={() => navigate('/admin/classes/list')}>
          <FaPlusCircle className="feature-icon" />
          <h4>Add Class</h4>
          <p>Create a new class with subject & time.</p>
        </div>

        <div className="feature-card" onClick={() => navigate('/admin/classes/assign')}>
          <FaUserTie className="feature-icon" />
          <h4>Assign Staff</h4>
          <p>Assign teacher for a specific class.</p>
        </div>

        <div className="feature-card" onClick={() => navigate('/admin/timetable/upload')}>
          <FaUpload className="feature-icon" />
          <h4>Upload Timetable</h4>
          <p>Upload weekly/monthly timetable.</p>
        </div>
      </div>

      <div className="activity-log">
        <h3>Recent Activity</h3>
        <ul>
          <li>📌 Science class added by Admin - 5 mins ago</li>
          <li>📌 Timetable updated for Grade 10 - 30 mins ago</li>
          <li>📌 Teacher assigned to English class - 1 hr ago</li>
        </ul>
      </div>
    </div>
  );
};

export default ClassesPage;
