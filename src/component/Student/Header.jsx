import React, { useState, useRef, useEffect } from 'react';
import '../../style/Header.css'; // Ensure the path is correct

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const handleToggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; // Or use `navigate('/')` if you're using react-router
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="small-header">
      <div className="header-title">Welcome, Nivetha</div>
      <div className="profile-container" ref={dropdownRef}>
        <img
          src="https://i.postimg.cc/sxWYtVkn/avatar-1.jpg"
          alt="Profile"
          className="profile-img"
          onClick={handleToggleDropdown}
        />
        {dropdownOpen && (
          <div className="dropdown-menu">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
