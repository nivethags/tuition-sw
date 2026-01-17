import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaCalendarAlt, FaCog } from 'react-icons/fa';
import '../../style/FooterNav.css';

const FooterNav = () => {
  const location = useLocation();

  return (
    <footer className="mobile-footer">
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
        <FaHome />
        <span>Home</span>
      </Link>

      <Link to="/timetable" className={location.pathname === '/timetable' ? 'active' : ''}>
        <FaCalendarAlt />
        <span>Timetable</span>
      </Link>

      <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
        <FaUser />
        <span>Profile</span>
      </Link>

      <Link to="/setting" className={location.pathname === '/setting' ? 'active' : ''}>
        <FaCog />
        <span>Settings</span>
      </Link>
    </footer>
  );
};

export default FooterNav;
