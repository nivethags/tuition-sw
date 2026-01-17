import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  CircularProgress,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const fetchReportData = async (classId, examType, month) => {
  try {
    const res = await fetch(
      `http://localhost:5000/admin/report?classId=${classId}&examType=${examType}&month=${month}`
    );

    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

    return await res.json();
  } catch (error) {
    console.error("❌ Failed to fetch report:", error);
    return { marksData: [], attendanceData: [] };
  }
};

const ReportPage = () => {
  const [classId, setClassId] = useState("");
  const [examType, setExamType] = useState("");
  const [month, setMonth] = useState("");
  const [marksData, setMarksData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin/classes");
        if (!res.ok) throw new Error("Network response was not ok");
        const classList = await res.json();
        setClasses(classList);

        const uniqueBatches = [
          ...new Set(classList.map((cls) => cls.batch).filter(Boolean)),
        ];
        setBatches(uniqueBatches);
      } catch (error) {
        console.error("❌ Failed to fetch classes:", error);
      }
    };
    fetchClasses();
  }, []);

  const handleApply = async () => {
    if (!classId || !examType || !month) {
      alert("Please select Class, Exam Type, and Month.");
      return;
    }
    setLoading(true);
    const { marksData, attendanceData } = await fetchReportData(
      classId,
      examType,
      month
    );
    setMarksData(marksData);
    setAttendanceData(attendanceData);
    setLoading(false);
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Filters */}
      <Card sx={{ p: 3, mb: 4, boxShadow: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Class</InputLabel>
              <Select
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                label="Class"
              >
                <MenuItem value="">
                  <em>Select Class</em>
                </MenuItem>
                {classes.map((cls) => (
                  <MenuItem key={cls.id} value={cls.standard}>
                    {cls.standard}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Exam Type</InputLabel>
              <Select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                label="Exam Type"
              >
                <MenuItem value="">
                  <em>Select Exam</em>
                </MenuItem>
                {batches.map((batch, idx) => (
                  <MenuItem key={idx} value={batch}>
                    {batch}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              type="month"
              label="Month"
              fullWidth
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleApply}
              disabled={loading}
              sx={{ height: "100%" }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Apply"}
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Charts */}
      <Grid container spacing={4} mb={4}>
        <Grid item xs={12} md={6} sx={{width:'100%',maxWidth: '50vw'}}>
          <Card sx={{ p: 2, boxShadow: 3 }}>
            <Typography variant="h6" color="primary" mb={2}>
              Marks Report
            </Typography>
            {marksData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={marksData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="studentName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="marks" fill="#1976d2" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Typography>No marks data available</Typography>
            )}
          </Card>
        </Grid>

        <Grid item xs={12} md={6} sx={{width:'100%',maxWidth: '50vw'}}>
          <Card sx={{ p: 2, boxShadow: 3 }}>
            <Typography variant="h6" color="success.main" mb={2}>
              Attendance Report
            </Typography>
            {attendanceData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="studentName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="attendance" fill="#2e7d32" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Typography>No attendance data available</Typography>
            )}
          </Card>
        </Grid>
      </Grid>

      {/* Table */}
      <Card sx={{ p: 3, boxShadow: 3 }}>
        <Typography variant="h6" color="secondary" mb={3}>
          Student Performance Details
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Marks</TableCell>
                <TableCell>Rank</TableCell>
                <TableCell>Attendance %</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {marksData.length > 0 ? (
                marksData.map((student, index) => (
                  <TableRow key={student.studentId} hover>
                    <TableCell>{student.studentName}</TableCell>
                    <TableCell>{student.marks}</TableCell>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {attendanceData.find(
                        (a) => a.studentId === student.studentId
                      )?.attendance ?? 0}
                      %
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default ReportPage;
