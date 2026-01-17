import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/AssignStaff.css'; // Optional styling
import { Padding } from '@mui/icons-material';

const AssignStaff = () => {
  const [teacherList, setTeacherList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [subjectList, setSubjectList] = useState([])

  const [formData, setFormData] = useState({
    teacherId: '',
    standard: '',
    subjects: [], 
    subject_id:''
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
  // Load teachers and classes initially
  axios.get('http://localhost:5000/admin/teachers')
    .then(res => setTeacherList(res.data.info))
    .catch(err => console.error('Error fetching teachers:', err));

  axios.get('http://localhost:5000/admin/classes')
    .then(res => setClassList(res.data))
    .catch(err => console.error('Error fetching classes:', err));
}, []);

// When standard changes, fetch subjects for that standard
useEffect(() => {
  if (formData.standard) {
    axios.get(`http://localhost:5000/admin/getsubjects?standard=${formData.standard}`)
      .then(res => {
        console.log(res.data);
        setSubjectList(res.data);
      }
      )
      .catch(err => console.error('Error fetching subjects:', err));
  } else {
    setSubjectList([]); // clear subjects if no class selected
  }
}, [formData.standard]);

const handleChange = e => {
  const { name, value, options, multiple } = e.target;

  if (multiple) {
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setFormData(prev => ({ ...prev, [name]: selectedValues }));
  } else {
    setFormData(prev => ({ ...prev, [name]: value }));
  }
};




  const handleSubmit = async (e) => {
    e.preventDefault();

    const { teacherId, standard, subjects } = formData;
    if (!teacherId || !standard || subjects.length === 0) {
      setMessage('Please select a teacher, class, and at least one subject.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/admin/assign-staff', formData);
      setMessage('Teacher assigned to class and subjects successfully!');
      setFormData({ teacherId: '', standard: '', subjects: [] });
    } catch (error) {
      console.error(error);
      setMessage('Error assigning teacher. Please try again.');
    }
  };

  return (
    <div className="assign-container">
      <h2>Assign Teacher to Class & Subjects</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="assign-form">
        <label>Select Teacher:</label>
        <select name="teacherId" value={formData.teacherId} onChange={handleChange}>
          <option value="">-- Select Teacher --</option>
          {teacherList.map(teacher => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name}
            </option>
          ))}
        </select>

        <label>Select Class:</label>
        <select name="standard" value={formData.standard} onChange={handleChange}>
          <option value="">-- Select Class --</option>
          {classList.map(cls => (
            <option key={cls.id} value={cls.standard}>
              {cls.standard}
            </option>
          ))}
        </select>

        <label>Select Subject(s):</label>
        <select
          name="subjects"
          multiple
          value={formData.subjects}
          onChange={handleChange}
          style={{ height: '100px', width: '100%' }}
        >
          {Array.isArray(subjectList) && subjectList.map(sub => (
            <option key={sub.id} value={sub.id} style={{Padding: '10px',height:'30px'}}>
              {sub.subject}
            </option>
          ))}
        </select>

        <button type="submit">Assign</button>
      </form>
    </div>
  );
};

export default AssignStaff;
