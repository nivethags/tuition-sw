import React, { useEffect, useState } from 'react';
import '../../style/TeachersPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  const fetchTeachers = async () => {

    axios.get('http://localhost:5000/admin/teachers')
      .then(res => {
        console.log("Teachers data fetched successfully:", res.data.info[0]);
        
        setTeachers(res.data.info)
      }
      )
      .catch(err => {
        console.error(err);
        alert('Failed to fetch teachers');
      });
    }


  useEffect(() => {
    // Replace with actual API
    fetchTeachers();
  }, []);

  const handleAddTeacher = () => {
    navigate('/admin/add-teacher'); // Or open modal if using one
  };

  return (
    <div className="teachers-container">
      <div className="teachers-header">
        <h2>Teachers</h2>
        <button className="add-teacher-btn" onClick={handleAddTeacher}>+ Add New Teacher</button>
      </div>

      <table className="teachers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Subjects</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length > 0 ? (
            teachers.map((teacher, index) => (
              <tr key={teacher.id || index}>
                <td>{teacher.id}</td>
                <td>{teacher.name}</td>
                <td>{teacher.subjects}</td>
                <td>{teacher.mail_id}</td>
                <td>{teacher.phno}</td>
                <td>{teacher.subjects}</td>
                <td>
                  <button className="edit-btn" onClick={() => navigate(`/admin/edit-teacher/${teacher.id}`)}>Edit</button>
                  <button className="delete-btn" onClick={() => {
                    if (window.confirm('Are you sure you want to delete this teacher?')) {
                      axios.delete(`http://localhost:5000/admin/delete-teachers/${teacher.id}`)
                        .then(() => {
                          fetchTeachers();
                          alert('Teacher deleted successfully');
                        })
                        .catch(err => {
                          console.error(err);
                          alert('Failed to delete teacher');
                        });
                    }
                  }}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">No teachers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeachersPage;
