import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/ClassList.css'; // Import the CSS

const ClassList = () => {
  const [classlist, setClasslist] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchClassList = async () => {
      try {
        const response = await fetch('http://localhost:5000/teacher/classes');
        const data = await response.json();
        setClasslist(data);
        console.log(data, "classlist data");
      } catch (error) {
        console.error('Error fetching class list:', error);
      }
    };

    fetchClassList();
  }, []);

  return (
    <div className="class-list-container">
      <h2>Available Classes</h2>
      <ul>
        {classlist.length > 0 ? (
          classlist.map((cls, index) => (
<li key={index} onClick={() => navigate(`/teacher/mark-attendance/${cls.id}`)}>
              
              {cls.subject}</li>
          ))
        ) : (
          <p>No classes found.</p>
        )}
      </ul>
    </div>
  );
};

export default ClassList;