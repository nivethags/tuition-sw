import React, { useEffect, useState } from 'react';
import '../../style/StudentsPage.css'; // Custom CSS for design
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const  navigate=useNavigate();
  // Dummy fetch logic – replace with your real API call
  useEffect(() => {

    axios.get('http://localhost:5000/teacher/getstudentlist')
    .then(res=>{
      setStudents(res.data.info);
      console.log(res.data.info);
      
    } 
    )
    .catch(err=>{
      console.log(err.message);
    })





    // const dummyStudents = [
    //   { id: 1, name: 'John Doe', class: '10th', email: 'john@example.com' },
    //   { id: 2, name: 'Jane Smith', class: '9th', email: 'jane@example.com' },
    // ];
    // setStudents(dummyStudents);
  }, []);

  const handleAddStudent = () => {
    // Navigate to Add Student Page OR open a modal

    navigate('/admin/add-student');
  };

  const deleteStudent =(id)=>{
    alert(`Are you sure you want to delete this student? ${id}`);
    axios.delete(`http://localhost:5000/admin/deletestudent/${id}`)
    .then(res=>{console.log(res.data);})
    .catch(err=>{console.log(err.message);
    })
  }

  return (
    <div className="students-container">
      <div className="students-header">
        <h2>Students</h2>
        <button className="add-btn" onClick={handleAddStudent}>+ Add New Student</button>
      </div>
      <table className="students-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Email</th>
            <th>Batch</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student,index) => (
              <tr key={student.id}>
                <td>{index+1}</td>
                <td>{student.name}</td>
                {/* <td>{ student.standard ? student.standard:"N/A" } - {student.class}</td> */}
                <td>{student.standard && student.standard.trim() !== '' ? student.standard : "N/A"} - { student.subject && student.subject.trim() !=''? student.subject :"Subject N/M"}</td>
                <td>{student.email}</td>
                <td>{student.batch}</td>
                <td>
                <button type='submit' className="edit-btn" onClick={() => navigate(`/admin/edit/student/${student.id}`)}>Edit</button>
                <button type='submit' className="delete-btn" onClick={() => deleteStudent(student.id)}>Delete</button>  
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-data">No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsPage;
