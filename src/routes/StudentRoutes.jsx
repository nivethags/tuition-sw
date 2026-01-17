import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../component/Student/Dashboard';
import Profile from '../component/Student/Profile';
import TimeTable from '../component/Student/TimeTable';
import Scroller from '../component/Student/Scroller';
import StudentAttendance from '../component/Student/StudentAttendance';
// Add more...

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="profile" element={<Profile />} />
      <Route path="timetable" element={<TimeTable />} />
      <Route path="scroller" element={<Scroller />} />
      <Route path="attendance" element={<StudentAttendance />} />
      {/* Add other student routes here */}
    </Routes>
  );
};

export default StudentRoutes;
