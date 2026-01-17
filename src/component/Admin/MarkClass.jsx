// MarkClass.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../style/MarkClass.css'; // Optional for styling

export const MarkClass = () => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/admin/classes')
      .then(res => setClasses(res.data))
      .catch(err => console.error("Failed to fetch classes", err));
  }, []);

  return (
    <div className="mark-class-container">
      <h2>📘 Select a Class to Mark Attendance</h2>
      <div className="class-list">
        {classes.length === 0 ? (
          <p>No classes available.</p>
        ) : (
          classes.map(cls => (
            <div className="class-card" key={cls.id}>
              <div className="class-info">
                <strong>Standard:</strong> {cls.standard} <br />
                <strong>Batch:</strong> {cls.batch}
              </div>
              <button className="mark-btn" onClick={() => navigate(`/admin/attendance/${cls.standard}/${cls.batch}`)}>
                Mark Attendance
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
