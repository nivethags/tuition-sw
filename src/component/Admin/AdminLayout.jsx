import React from 'react';
import SideBar from './SideBar'; // Adjust path as needed
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ marginLeft: '20%', padding: '20px', width: '100%' }}>
        <Outlet /> {/* This renders the nested route */}
      </div>
    </div>
  );
};

export default AdminLayout;
