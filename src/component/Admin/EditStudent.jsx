import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../style/EditStuduent.css'; // Style for the page

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const [loading, setLoading] = useState(true);

useEffect(() => {

  axios.get(`http://localhost:5000/admin/student/${id}`)
    .then(res => {
      setFormData(res.data[0]);
      setLoading(false);
      console.log("Fetched student data:",res.data[0]);
      
    })
    .catch(err => {
      console.log(err.message);
      setLoading(false);
    });
}, [id]);


  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/admin/updatestudent/${id}`, formData)
      .then(() => {
        alert("Student updated successfully!");
        navigate('/admin/students');
      })
      .catch(err => {
        console.error(err.message);
        alert("Update failed.");
      });
  };

  return (
    <div className="edit-student-container">
      <h2>Edit Student</h2>
      {loading ? (
      <p>Loading student data...</p>
    ) : (
      <form className="edit-student-form" onSubmit={handleUpdate}>
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter full name"
            />
          </div>
          <div className="form-group">
            <label>Standard</label>
            <input
              type="text"
              name="standard"
              value={formData.standard}
              onChange={handleChange}
              required
              placeholder="e.g., 9th, 10th"
            />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g., Mathematics"
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="e.g., student@example.com"
            />
          </div>
          <div className="form-group">
            <label>Batch</label>
            <input
              type="text"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              required
              placeholder="Morning/Afternoon/Evening ( Please choose only scheduled )"
            />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="update-btn">Update</button>
          <button type="button" className="cancel-btn" onClick={() => navigate('/admin/students')}>Cancel</button>
        </div>
      </form>
    )}
    </div>
  );
};

export default EditStudent;
