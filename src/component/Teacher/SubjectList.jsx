import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubjectList = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const navigate = useNavigate();

  const subjects = [
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'Science' },
    { id: 3, name: 'English' },
  ];

  const handleUploadClick = (subjectId) => {
    setSelectedSubject(subjectId === selectedSubject ? null : subjectId);
  };

  const handleUpload = (subject, type) => {
    // Ensure type is lowercase for route
    const uploadType = type.toLowerCase();
    navigate(`/teacher/upload/${subject.id}/${uploadType}`);
  };

  return (
    <div style={{ marginTop: '17%', maxWidth: '600px' }}>
      <h2 style={{ color: 'white' }}>Allocated Subjects</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {subjects.map((subject) => (
          <li
            key={subject.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              margin: '10px 0',
              padding: '15px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <strong>{subject.name}</strong>
            <button
              onClick={() => handleUploadClick(subject.id)}
              style={{
                marginLeft: '20px',
                padding: '5px 10px',
                cursor: 'pointer',
              }}
            >
              Upload
            </button>

            {selectedSubject === subject.id && (
              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={() => handleUpload(subject, 'Material')}
                  style={{ marginRight: '10px' }}
                >
                  Upload Material
                </button>
                <button onClick={() => handleUpload(subject, 'Mark')}>
                  Upload Mark
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectList;
