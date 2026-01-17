import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

const students = [
  { id: 1, name: 'Lakshmi R' },
  { id: 2, name: 'Rahul K' },
  { id: 3, name: 'Anita M' },
  { id: 4, name: 'Vikram P' },
  // Add more students here
];

const AttendanceMarking = () => {
  const [attendance, setAttendance] = useState({});

  const handleChange = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = () => {
    console.log('Marked Attendance:', attendance);
    // Optionally: send this to your backend
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Mark Attendance
      </Typography>

      <Grid container spacing={2}>
        {students.map((student) => (
          <Grid item xs={12} md={6} key={student.id} style={{width:'100%'}}>
            <Paper elevation={2} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography fontWeight={600}>{student.name}</Typography>
                <Typography variant="caption">ID: {student.id}</Typography>
              </Box>

              <ToggleButtonGroup
                value={attendance[student.id] || ''}
                exclusive
                onChange={(_, value) => handleChange(student.id, value)}
                color="primary"
                size="small"
              >
                <ToggleButton value="Present" style={{color:'black'}}>✅ Present</ToggleButton>
                <ToggleButton value="Absent" style={{color:'black'}}>❌ Absent</ToggleButton>
              </ToggleButtonGroup>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 4 }}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit Attendance
        </Button>
      </Stack>
    </Box>
  );
};

export default AttendanceMarking;
