import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// Sample student marks data
const sampleMarks = [
  {
    id: 1,
    name: "Arun Kumar",
    class: "IX‑A",
    subjects: {
      Math: 85,
      Science: 78,
      English: 92,
    },
  },
  {
    id: 2,
    name: "Bhavya Sharma",
    class: "IX‑A",
    subjects: {
      Math: 75,
      Science: 66,
      English: 81,
    },
  },
  {
    id: 3,
    name: "Chirag Rao",
    class: "IX‑B",
    subjects: {
      Math: 95,
      Science: 89,
      English: 94,
    },
  },
  {
    id: 4,
    name: "Deepika S.",
    class: "IX‑B",
    subjects: {
      Math: 68,
      Science: 73,
      English: 70,
    },
  },
];

const MarkPage = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Replace with: fetch("/api/marks") if using backend
    const formattedRows = sampleMarks.map((student) => ({
      id: student.id,
      name: student.name,
      class: student.class,
      ...student.subjects,
    }));
    setRows(formattedRows);
  }, []);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "name", headerName: "Student", flex: 1, minWidth: 150 },
      { field: "class", headerName: "Class", width: 100 },
      { field: "Math", headerName: "Math", type: "number", width: 100 },
      { field: "Science", headerName: "Science", type: "number", width: 100 },
      { field: "English", headerName: "English", type: "number", width: 100 },
    ],
    []
  );

  return (
    <Paper sx={{ p: 3, mt: 5 }}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Student Marks</Typography>
      </Stack>

      <Box sx={{ height: 500 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={8}
          disableSelectionOnClick
          getRowId={(r) => r.id}
        />
      </Box>
    </Paper>
  );
};

export default MarkPage;
