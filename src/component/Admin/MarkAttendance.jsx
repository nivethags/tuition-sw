import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../style/MarekAttendance.css'; // Optional CSS

const MarkAttendance = () => {

  const { id , batch } = useParams();
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  
useEffect(() => {
  const fetchData = async () => {
    try {
      const studentRes = await axios.get(`http://localhost:5000/admin/student/${id}/${batch}`);
      const studentsArray = studentRes.data.info || [];
      setStudents(studentsArray);

   
      const attendanceRes = await axios.get(`http://localhost:5000/admin/attendance/${id}/${batch}`);
      const rawList = attendanceRes.data.list || [];
      
      console.log("Fetching existing attendance...",rawList);

      // ✅ Map of student_id → boolean status
      const existingAttendance = {};
      rawList.forEach(record => {
        existingAttendance[record.student_id] = Number(record.status) ===1;
      });

      setAttendance(prev => ({
        ...prev,
        ...existingAttendance,
      }));

      setStudents(prev => prev.map(student => ({
        ...student,
        status: existingAttendance[student.id] !== undefined 
          ? existingAttendance[student.id]
          : true,
      })));

      
        
      setLoading(false);
    } catch (err) {
      console.error("Error in attendance fetch:", err);
      setLoading(false);
    }
  };

  fetchData();
}, [id, batch]);



const handleToggle = (studentId) => {
  setAttendance(prev => ({
    ...prev,
    [studentId]: !prev[studentId],
  }));

  setStudents(prev =>
    prev.map(student =>
      student.id === studentId
        ? { ...student, status: !student.status }
        : student
    )
  );
};

  const handleSubmit = async () => {
  try {
    const payload = {
      classId: id,
      batch,
      date: new Date().toISOString().split('T')[0],
      students: students.map(student => ({
        id: student.id,
        status: student.status
      })),
    };

    // console.log("Submitting attendance payload:", payload);

    await axios.post('http://localhost:5000/admin/attendance', payload);
    alert('Attendance submitted successfully');
  } catch (err) {
    console.error('Failed to submit attendance:', err);
    alert('Submission failed');
  }
};


  if (loading) return <p>Loading students...</p>;

  return (
    <div className="attendance-container">
      <h2>📋 Mark Attendance</h2>
      {students?.length === 0 ? (
        <p>No students found in this class.</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <table className="attendance-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        checked={student.status}
                        onChange={() => handleToggle(student.id)}
                      />
                      {student.status ? ' Present' : ' Absent' }
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="submit" className="submit-btn">Submit Attendance</button>
        </form>
      )}
    </div>
  );
};

export default MarkAttendance;
