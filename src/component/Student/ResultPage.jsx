import React from 'react';
import { useParams } from 'react-router-dom';

const ResultPage = () => {
  const { studentId, day, subject } = useParams();

  // Here you can fetch or display result for this student, day, and subject.
  // Example: fetch from API or use dummy data

  return (
    <div>
      <h1>Results for Student: {studentId}</h1>
      <h2>{subject} on {day}</h2>
      {/* Add result details here */}
    </div>
  );
};

export default ResultPage;
