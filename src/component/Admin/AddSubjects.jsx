import React, { useEffect, useState } from 'react';
import '../../style/AddSubjects.css'; // Custom styles for the Add Subjects page
import axios from 'axios';
const AddSubject = () => {

  const [formData, setFormData] = useState({
    subjectName: '',
    subjectCode: '',
    standard:''
  });


  const [teacher,setTeacher]=useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

useEffect(()=>{
  axios.get('http://localhost:5000/admin/getTeacher')
  .then(res=>{
    setTeacher(res.data);
    console.log(res.data);
    
})
  .catch(err=>console.log(err))
},[])

  const [msg,setMsg]=useState("");


  const handleSubmit = (e) => {
    e.preventDefault();


    axios.post('http://localhost:5000/admin/addSubject', formData)
    .then(res=> setMsg(res.data.message))
    .catch(err=> setMsg(err.response.data.message));


    alert("✅ Subject added successfully (mock)");
    console.log("Submitted data:", formData);
  };

  return (
    <div className="subject-page">
      <div className="form-container" style={{    display: 'flex',
    flexDirection: 'column',}}>
        <h2>Add New Subject</h2>
        <form onSubmit={handleSubmit}>
          <label>Subject Name</label>
          <input
            type="text"
            name="subjectName"
            value={formData.subjectName}
            onChange={handleChange}
            required
            placeholder="e.g. Science"
          />

          <label>Subject Code</label>
          <input
            type="text"
            name="subjectCode"
            value={formData.subjectCode}
            onChange={handleChange}
            required
            placeholder="e.g. SCI101"
          />

          <label>Teacher Name</label>
          <select >
            <option value="" disabled selected>Select Teacher</option>
            {
              teacher.map((staff,index)=>{
                <option value={staff.id}>{staff.name}</option>
                
              })

            }
          

          </select>
          <input
            type="text"
            name="teacherName"
            value={formData.teacherName}
            onChange={handleChange}
            required
            placeholder="e.g. Mrs. Kavitha"
          />
          {
            msg && <div className="message">{msg}</div>
          }
          <button type="submit">➕ Add Subject</button>
        </form>
      </div>
    </div>
  );
};

export default AddSubject;
