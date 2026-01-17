import React, { useState } from 'react';
import axios from 'axios';
import '../../style/AddStudent.css'; // Custom styles

const AddStudent = () => {
  const [student, setStudent] = useState({
    name: '',
    age: '',
    gender: '',
    standard: '',
    studentid: '',
    studentpassword: '',
    email: '',
    phone: '',
    joiningDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/teacher/addStudent', student)
      .then((res) => {
        alert('Student added successfully!');
        setStudent({
          name: '',
          age: '',
          gender: '',
          standard: '',
          studentid: '',
          studentpassword: '',
          email: '',
          phone: '',
          joiningDate: '',
        });
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to add student.');
      });
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Add New Student</h2>
      <form className="student-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student Name</label>
          <input type="text" name="name" value={student.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Joining Date</label>
          <input type="date" name="joiningDate" value={student.joiningDate} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input type="number" name="age" min="5" max="25" value={student.age} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={student.gender} onChange={handleChange} required>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Standard</label>
          <select name="standard" value={student.standard} onChange={handleChange} required>
            <option value="">Select standard</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div className="form-group">
          <label>Student ID</label>
          <input type="text" name="studentid" value={student.studentid} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Student Password</label>
          <input type="text" name="studentpassword" value={student.studentpassword} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={student.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input type="tel" name="phone" pattern="[0-9]{10}" value={student.phone} onChange={handleChange} required />
        </div>

        <div className="form-actions">
          <button type="submit">Add Student</button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
