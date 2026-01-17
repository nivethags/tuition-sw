import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../component/Admin/AdminLayout'; // adjust path
import AdminDashBoard from '../component/Admin/DashBoard';
import TeachersPage from '../component/Admin/TeachersPage';
import AddSubjects from '../component/Admin/AddSubjects';
import StudentsPage from '../component/Admin/StudentsPage';
import AddStudent from '../component/Teacher/AddStudent';
import AddTeachers from '../component/Admin/AddTeachers';
import ClassesPage from '../component/Admin/ClassesPage';
import TodayTimetable from '../component/Admin/TodayTimetable';
import EditTimeTable from '../component/Admin/EditTimetable';
import EditStudent from '../component/Admin/EditStudent';
import EditTeacher from '../component/Admin/EditTeacher';
import UploadTimetable from '../component/Admin/UploadTimeTable';
import AddClass from '../component/Admin/AddClass';
import ClassList from '../component/Admin/ClassList';
import AssignStaff from '../component/Admin/AssignStaff';
import StaffClass from '../component/Admin/StaffClass';
import { MarkClass } from '../component/Admin/MarkClass';
import MarkAttendance from '../component/Admin/MarkAttendance';
import UploadMarks from '../component/Admin/UploadMarks';
import ReportPage from '../component/Admin/ReportPage';
import Settings from '../component/Admin/Settings';
// Add more...

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashBoard />} />
        <Route path="teachers" element={<TeachersPage />} />
        <Route path="add-subjects" element={<AddSubjects />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="add-student" element={<AddStudent />} />
        <Route path="add-teacher" element={<AddTeachers />} />
        <Route path="classes" element={<ClassesPage />} />
        <Route path="/timetable/today" element={<TodayTimetable />} />
        <Route path="/edit/timetable/:id" element={<EditTimeTable />} />
        <Route path="/edit/student/:id" element={<EditStudent />} />
        <Route path="/edit-teacher/:id" element={<EditTeacher />} />
        <Route path="/timetable/upload" element={<UploadTimetable />} />
        <Route path="/classes/list" element={<ClassList />} />
        <Route path="/classes/add" element={<AddClass />} />
        <Route path="/classes/assign" element={<AssignStaff />} />
        <Route path="/classes/assigned" element={<StaffClass />} />
        <Route path="/attendanceList" element={<MarkClass />} />
        <Route path="/attendance/:id/:batch" element={<MarkAttendance />} />
        <Route path="/upload-marks" element={<UploadMarks />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/student-report" element={<ReportPage />} />
        {/* Add other admin routes here */}
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
