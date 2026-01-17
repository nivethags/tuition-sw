import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Card } from '@mui/material';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled(Box)`
  padding: 3rem 2rem;
  background: linear-gradient(to right, #eef2f3, #ffffff);
  min-height: 100vh;
`;

const AnimatedCard = styled(motion(Card))`
  padding: 2rem;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled(Typography)`
  font-size: 2rem;
  font-weight: bold;
  color: #1a237e;
  text-align: center;
  margin-bottom: 2rem;
`;

const AttendanceDetailPage = () => {
  const { studentId, month } = useParams();
  const navigate = useNavigate();

  // Dummy data: attendance details by student and month
  // Replace this with real API data fetch in production
  const attendanceDataByStudent = {
    "student1": {
      Jan: [
        { date: '01 Jan', status: 'Present' },
        { date: '02 Jan', status: 'Absent' },
        { date: '03 Jan', status: 'Present' },
      ],
      Feb: [
        { date: '01 Feb', status: 'Present' },
        { date: '02 Feb', status: 'Present' },
        { date: '03 Feb', status: 'Absent' },
        { date: '04 Feb', status: 'Present' },
      ],
    },
    "student2": {
      Jan: [
        { date: '01 Jan', status: 'Absent' },
        { date: '02 Jan', status: 'Absent' },
      ],
      Feb: [
        { date: '01 Feb', status: 'Present' },
        { date: '02 Feb', status: 'Absent' },
      ],
    },
    // Add more students as needed
  };

  const monthData = attendanceDataByStudent[studentId]?.[month] || [];

  return (
    <Container>
      <AnimatedCard
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>Attendance for Student ID: {studentId} - {month}</Title>

        {monthData.length === 0 ? (
          <Typography variant="body1" align="center" color="textSecondary">
            No attendance data available for student {studentId} in {month}.
          </Typography>
        ) : (
          <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
            {monthData.map(({ date, status }, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  borderBottom: '1px solid #ddd',
                  backgroundColor: status === 'Present' ? '#e8f5e9' : '#ffebee',
                  borderRadius: '4px',
                  marginBottom: '8px',
                }}
              >
                <Typography variant="body1">{date}</Typography>
                <Typography
                  variant="body1"
                  color={status === 'Present' ? 'success.main' : 'error.main'}
                  fontWeight="bold"
                >
                  {status}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        <Button
          variant="contained"
          sx={{ marginTop: '1.5rem' }}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </AnimatedCard>
    </Container>
  );
};

export default AttendanceDetailPage;
