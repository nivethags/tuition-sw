import React from "react";
import "../../style/Sidebar.css";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const Logout=()=>{
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('tokenExpiry');
    window.location.href="/login";
  }
  return (
    <div className="sidebar"style={{ width: '20%',paddingLeft:'50px'}}>
      <div className="sidebar-header">
        <h2>Tuition Admin</h2>
      </div>
      <ul className="sidebar-nav">
        <li>
          <NavLink exact="true" to="/admin/dashboard" activeclassname="active">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/admin/students" activeclassname="active">Students</NavLink>
        </li>
        <li>
          <NavLink to="/admin/teachers" activeclassname="active">Teachers</NavLink>
        </li>
        <li>
          <NavLink to="/admin/classes" activeclassname="active">Classes</NavLink>
        </li>
        {/* <li>
          <NavLink to="/admin/subjects" activeclassname="active">Subjects</NavLink>
        </li> */}
        <li>
          <NavLink to="/admin/upload-marks" activeclassname="active">Upload Marks</NavLink>
        </li>
        <li>
          <NavLink to="/admin/student-report" activeclassname="active">Reports</NavLink>
        </li>
        <li>
          <NavLink to="/admin/attendanceList" activeclassname="active">Mark Attendance</NavLink>
        </li>
        <li>
          <NavLink to="/admin/settings" activeclassname="active">Settings</NavLink>
        </li>
        <li>
          <NavLink to="/logout" activeclassname="active" onClick={Logout}>Logout</NavLink>
        </li>
      </ul> 
    </div>
  );
};

export default SideBar;
