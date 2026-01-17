import React from 'react';
import styled from 'styled-components';
import { Box, Typography, Card } from '@mui/material';
import { motion } from 'framer-motion';
import { VictoryChart, VictoryAxis, VictoryTheme, VictoryLine, VictoryScatter, VictoryTooltip } from 'victory';
import { useNavigate } from 'react-router-dom';




import '../../style/StudentAttendance.css'; // Assuming you have a CSS file for styling


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
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled(Typography)`
  font-size: 2rem;
  font-weight: bold;
  color: #1a237e;
  text-align: center;
  margin-bottom: 2rem;
`;

const attendanceData = [
  { month: 'Jan', attendance: 30 },
  { month: 'Feb', attendance: 25 },
  { month: 'Mar', attendance: 28 },
  { month: 'Apr', attendance: 35 },
  { month: 'May', attendance: 20 },
  { month: 'Jun', attendance: 30 },
];

const StudentAttendance = ({ studentId }) => {
  const navigate = useNavigate();

  const handlePointClick = (month) => {
    // Navigate including studentId and month
    navigate(`/attendance/${studentId}/${month}`);
  };

  return (
    <Container>
      <AnimatedCard
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>Monthly Attendance Report</Title>

        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={20}
          animate={{ duration: 1000, easing: "linear" }}
        >
          <VictoryAxis
            tickValues={attendanceData.map(d => d.month)}
            style={{
              tickLabels: { fontSize: 12, angle: -45 },
              grid: { stroke: "#e6e6e6" }
            }}
          />
          <VictoryAxis
            dependentAxis
            domain={[0, 40]}
            style={{
              grid: { stroke: "#e6e6e6" }
            }}
            tickFormat={(x) => `${x} days`}
          />
          <VictoryLine
            data={attendanceData}
            x="month"
            y="attendance"
            interpolation="linear"
            style={{ data: { stroke: "#1976d2", strokeWidth: 3 } }}
          />
          <VictoryScatter
            data={attendanceData}
            x="month"
            y="attendance"
            size={6}
            style={{ data: { fill: "#1976d2" } }}
            labels={({ datum }) => `${datum.month}: ${datum.attendance} days`}
            labelComponent={<VictoryTooltip />}
            events={[{
              target: "data",
              eventHandlers: {
                onClick: (event, props) => {
                  const clickedMonth = props.datum.month;
                  handlePointClick(clickedMonth);
                }
              }
            }]}
          />
        </VictoryChart>
      </AnimatedCard>
    </Container>
  );
};

export default StudentAttendance;
