import React, { useState, useEffect } from 'react';
import '../../style/AddTeachers.css'; // Reuse same styling
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditTeacher = () => {
  const { id } = useParams(); // Get teacher ID from route
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    subjects: '',
    mail_id: '',
    phno: '',
    qualification: '',
  });

  useEffect(() => {
    // Fetch teacher data on mount
    const fetchTeacher = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/admin/teacher-detail/${id}`);
        console.log("Fetched teacher data:", res.data);
        setFormData(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to load teacher data');
      }
    };

    fetchTeacher();
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/admin/update-teacher/${id}`, formData);
      alert('Teacher updated successfully!');
      navigate('/admin/teachers');
    } catch (err) {
      console.error(err);
      alert('Failed to update teacher');
    }
  };

  return (
    <div className="add-teacher-container">
      <h2>Edit Teacher</h2>
      <form onSubmit={handleSubmit} className="teacher-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input 
              type="text" 
              name="subjects" 
              value={formData.subjects} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="mail_id" 
              value={formData.mail_id} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input 
              type="tel" 
              name="phno" 
              value={formData.phno} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group full-width">
            <label>Qualification</label>
            <input 
              type="text" 
              name="qualification" 
              value={formData.qualification} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Update Teacher</button>
        </div>
      </form>
    </div>
  );
};

export default EditTeacher;