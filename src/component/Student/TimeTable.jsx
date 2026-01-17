import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/TimeTable.css';
// import '../../../images/timetable.webp'; // Ensure the image path is correct

// Static data for demonstration
const timeSlots = ["Daily", "Test", "Staff"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const schedule = {
  Monday: ["Tamil", "Social", "Alpha"],
  Tuesday: ["Tamil", "English", "Beta"],
  Wednesday: ["Tamil", "Maths", "Gama"],
  Thursday: ["Social", "English", "Phy"],
  Friday: ["Science", "English", "Sigma"],
};

const results = {
  Monday: ["Social"],
  Tuesday: [],
  Wednesday: ["Maths"],
  Thursday: ["English", "Social"],
  Friday: ["Science"],
};

const studentId = '12345'; // Ideally get this from context or login data

const TimeTable = () => {
  const navigate = useNavigate();

  const handleResultClick = (day, subject) => {
    navigate(`/result/${studentId}/${day}/${subject}`);
  };

  return (
    <div className="timetable-container">
      <h2 className="timetable-heading">Weekly Time Table</h2>
      
      <div className="image-container">
        <img
          src="/images/timetable.webp"
          alt="Timetable"
          className="timetable-image"
          style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>
    </div>
  );
};

export default TimeTable;
