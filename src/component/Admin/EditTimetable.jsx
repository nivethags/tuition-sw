import React, { useEffect, useState } from 'react';
import '../../style/EditTimetable.css';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const EditTimeTable = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    subject: '',
    staff_name: '',
    day: '',
    room: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/admin/edit-timetable/${id}`)
      .then(res => {
        setFormData(res.data);
        console.log("Timetable data fetched successfully:", res.data);
      })
      .catch(err => {
        console.error("Error fetching timetable:", err);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    
    axios.put(`http://localhost:5000/admin/edit-timetable/${id}`, formData)
      .then(res => {
        console.log("Timetable updated successfully:", res.data);
        navigate('/admin/timetable/today');
      })
      .catch(err => {
        console.error("Error updating timetable:", err);
      });
  };






  return (
    <motion.div className="edit-timetable-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h2 className="edit-title">Edit Timetable Slot</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="edit-grid">
          <div>
            <label>Subject</label>
            <input type="text" name="subject" value={formData.subject || ''} onChange={handleChange} required />
          </div>
          <div>
            <label>Teacher</label>
            <input type="text" name="staff_name" value={formData.staff_name || ''} onChange={handleChange} required />
          </div>
          <div>
            <label>Day</label>
            <select name="day" value={formData.day || ''} onChange={handleChange} required>
              <option value="">Select Day</option>
              <option value={"Monday"}>Monday</option>
              <option value={"Tuesday"}>Tuesday</option>
              <option value={"Wednesday"}>Wednesday</option>
              <option value={"Thursday"}>Thursday</option>
              <option value={"Friday"}>Friday</option>
              <option value={"Saturday"}>Saturday</option>
            </select>
          </div>
          <div>
            <label>Classroom</label>
            <input type="text" name="room" value={formData.room || ''} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-buttons">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="btn-primary">
            Save Changes
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="button" className="btn-secondary" onClick={() =>navigate('/classes/timetable')}>
            Cancel
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default EditTimeTable;
