import React, { useState } from 'react';
import axios from 'axios';
import '../../style/AddClass.css'; // Optional: for styling

const AddClass = () => {
  const [formData, setFormData] = useState({
    standard: '',
    subject: '',
    batch: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/admin/add-class', formData)
      .then(res => {
        alert("Class added successfully!");
        setFormData({ standard: '', subject: '', batch: '' }); // Reset form
      })
      .catch(err => {
        console.error("Error adding class:", err);
        alert("Failed to add class.");
      });
  };

  return (
    <div className="add-class-container">
      <h2>Add New Class</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Standard</label>
          <input
            type="text"
            name="standard"
            value={formData.standard}
            onChange={handleChange}
            placeholder="Eg: 10th, 11th"
            required
          />
        </div>

        <div className="form-group">
          <label>Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Eg: Physics, Maths"
            required
          />
        </div>

        <div className="form-group">
          <label>Batch</label>
          <input
            type="text"
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            placeholder="Eg: Batch A, Evening"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Add Class</button>
      </form>
    </div>
  );
};

export default AddClass;
