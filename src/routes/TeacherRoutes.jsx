import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../component/Teacher/DashBoard';
import AddStudent from '../component/Teacher/AddStudent';
import AttendanceMarking from '../component/Teacher/AttendanceMarking';
import ClassList from '../component/Teacher/ClassList';
import FeesStatusPage from '../component/Teacher/FeesStatusPage';
import MarkPage from '../component/Teacher/MarkPage';
import MaterialUploadPage from '../component/Teacher/MaterialUploadPage';
import SubjectList from '../component/Teacher/SubjectList';
// Add more...

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="add-student" element={<AddStudent />} />
      <Route path="mark-attendance/:id" element={<AttendanceMarking />} />
      <Route path="attendance-classlist" element={<ClassList />} />
      <Route path="mark-fees" element={<FeesStatusPage />} />
      <Route path="view-mark" element={<MarkPage />} />
      <Route path="upload-material" element={<MaterialUploadPage />} />
      <Route path="upload-file" element={<SubjectList />} />
    </Routes>
  );
};

export default TeacherRoutes;
