import React, { useEffect } from 'react';
import '../../style/TodayTimetable.css';
import { FaUserEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TodayTimetable = () => {



  const [todayClasses, setTodayClasses] = React.useState([]);

  useEffect(() => {

    axios.get('http://localhost:5000/admin/get-timetable')
      .then(res => {
        console.log("Today's classes fetched successfully:", res.data.info);
        setTodayClasses(res.data.info);
      })
      .catch(err => {
        console.error(err);
        alert('Failed to fetch today\'s classes');
      })
  },[]);

  const navigate = useNavigate();

  const callEditPage = (id) => {
    navigate(`/admin/edit/timetable/${id}`);
  };

const handleDelete = (id) => {
  if (window.confirm('Are you sure you want to cancel this class?')) {
    console.log(`Class with id ${id} cancelled`);
    
    axios.delete(`http://localhost:5000/admin/delete-timetable/${id}`)
      .then(res => {
        console.log("Timetable deleted successfully:", res.data);
        // Navigate only after successful deletion
  window.location.reload();       })
      .catch(err => {
        console.log("Error while deleting timetable", err);
        alert("Something went wrong while deleting.");
      });
  }
};


  const total = todayClasses.length;
  const assigned = todayClasses.filter(cls => cls.teacher).length;
  const unassigned = total - assigned;

  return (
    <div className="today-timetable-container">
      <h2>📅 Today's Timetable</h2>

      {/* Summary Section */}
      <div className="summary-widgets">
        <div className="widget total">Total Classes: {total}</div>
        <div className="widget assigned">Assigned: {assigned}</div>
        <div className="widget unassigned">Unassigned: {unassigned}</div>
      </div>

      {/* Timetable Table */}
      <div className="timetable-table">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Class</th>
              <th>Subject</th>
              <th>Room</th>
              <th>Teacher</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todayClasses.map((cls,index) => (
              <tr key={cls.id}>
                <td>{index +1}</td>
                <td>{cls.standard}</td>
                <td>{cls.subject}</td>
                <td>{cls.room}</td>
                <td>{cls.staff_name || '—'}</td>
                <td>
                  <button className="edit-btn" onClick={() => callEditPage(cls.id)}>
                    <FaUserEdit /> Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(cls.id)}>
                    <FaTrashAlt /> Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodayTimetable;
