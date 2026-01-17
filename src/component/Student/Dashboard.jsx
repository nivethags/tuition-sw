import React from 'react';
import { Link } from 'react-router-dom';
import DashboardCard from './DashboardCard';
import Scroller from './Scroller';
import TimeTable from './TimeTable';
import StaffScroller from './StaffScroller'; // Optional, currently commented
import QuoteGenerator from './QuoteGenerator';
import FooterNav from './FooterNav';
import '../../style/Dashboard.css'; // Custom dashboard styles
import Header from './Header';

const DashBoard = () => {
  return (
    <div className="dashboard-container" style={{ width: '100vw', boxSizing: 'border-box' }}>
      
      {/* Main Content Section */}
        <Header/>
        <DashboardCard />
        <QuoteGenerator />
        <Scroller />
        <TimeTable />
        {/* <StaffScroller /> */}

      
      
    </div>
  );
};

export default DashBoard;
