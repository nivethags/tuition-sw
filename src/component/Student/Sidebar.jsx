import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/Sidebar.css'; // Assuming you have a CSS file for styling

const Sidebar = ({ isExpanded, setIsExpanded, profileImage }) => {
  const toggleSidebar = () => {
    setIsExpanded(prev => !prev);
  };
const studentId = "123"; // example student id

  return (
    <nav className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <i className="fa-solid fa-caret-right"></i>
      </button>

      <section className="sidebar-logo" onClick={toggleSidebar}>
        {profileImage ? (
          <img
            src={profileImage}
            alt="Student Profile"
            className="sidebar-profile-img"
          />
        ) : (
          <i className="fa-solid fa-web-awesome"></i>
        )}
        <h1 className="logo-text">Brand</h1>
      </section>

      <ul className="menu">
        <li>
          <Link to="/"><i className="fa-solid fa-house"></i><span>Home</span></Link>
        </li>
        <li>
          <Link to="/profile"><i className="fa-solid fa-user"></i><span>Profile</span></Link>

<Link to={`/student/${studentId}/attendance`}>
  <i className="fa-solid fa-user"></i><span>Attendance</span>
</Link>
        </li>
        {/* <li>
          <Link to="/settings"><i className="fa-solid fa-gear"></i><span>Settings</span></Link>
        </li>
        <li>
          <Link to="/logout"><i className="fa-solid fa-right-from-bracket"></i><span>Exit</span></Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Sidebar;
