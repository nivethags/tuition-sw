import React from 'react';
import { useParams } from 'react-router-dom';

const dummyResults = {
  studentId: '12345',
  exams: {
    "Unit Test 1": [
      { subject: "Math", marks: 45, total: 50, grade: "A", remark: "Good" },
      { subject: "Science", marks: 40, total: 50, grade: "B+", remark: "Can Improve" },
    ],
    "Unit Test 2": [
      { subject: "Math", marks: 47, total: 50, grade: "A+", remark: "Excellent" },
      { subject: "Science", marks: 43, total: 50, grade: "A", remark: "Well Done" },
    ]
  }
};

const Result = () => {
  const { studentId } = useParams();

  // Replace dummyResults with fetched API results using studentId
  const studentResults = dummyResults.studentId === studentId ? dummyResults.exams : {};

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial',color:'white' }}>
      <h1>Result Report for Student ID: {studentId}</h1>
      
      {Object.keys(studentResults).length > 0 ? (
        Object.entries(studentResults).map(([examName, subjects]) => (
          <div key={examName} style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#1976d2' }}>{examName}</h2>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: '#f9f9f9',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <thead style={{ background: '#1976d2', color: '#fff' }}>
                <tr>
                  <th style={{ padding: '10px', border: '1px solid #ccc' }}>Subject</th>
                  <th style={{ padding: '10px', border: '1px solid #ccc' }}>Marks</th>
                  <th style={{ padding: '10px', border: '1px solid #ccc' }}>Grade</th>
                  <th style={{ padding: '10px', border: '1px solid #ccc' }}>Remark</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((s, index) => (
                  <tr key={index}>
                    <td style={{ padding: '10px', border: '1px solid #ddd',color:'black' }}>{s.subject}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd',color:'black' }}>{s.marks}/{s.total}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd',color:'black'  }}>{s.grade}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd',color:'black'  }}>{s.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>No results available for this student.</p>
      )}
    </div>
  );
};

export default Result;
