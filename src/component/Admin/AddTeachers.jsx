import React, { useState } from 'react';
import '../../style/AddTeachers.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTeachers = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    phone: '',
    qualification: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/admin/add-teacher', formData);
      alert('Teacher added successfully!');
      navigate('/admin/teachers');
    } catch (err) {
      console.error(err);
      alert('Failed to add teacher');
    }
  };

  return (
    <div className="add-teacher-container">
      <h2>Add New Teacher</h2>
      <form onSubmit={handleSubmit} className="teacher-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="form-group full-width">
            <label>Qualification</label>
            <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Add Teacher</button>
        </div>
      </form>
    </div>
  );
};

export default AddTeachers;
