import React, { useState, useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddTeacherDialog from "./AddTeacherDialog";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchTeachers = () =>
    fetch("/api/teachers")
      .then((r) => r.json())
      .then(setTeachers);

  useEffect(fetchTeachers, []);

  const cols = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "subject", headerName: "Subject", width: 120 },
    { field: "phone", headerName: "Phone", width: 120 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 180 },
    { field: "experience", headerName: "Exp (yrs)", type: "number", width: 120 },
  ];

  return (
    <>
      <Paper sx={{ p: 3, mt: 5 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5">Teachers</Typography>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Teacher
          </Button>
        </Box>

        <Box sx={{ height: 520 }}>
          <DataGrid rows={teachers} columns={cols} getRowId={(r) => r.id} />
        </Box>
      </Paper>

      <AddTeacherDialog
        open={open}
        onClose={() => setOpen(false)}
        onCreated={fetchTeachers}
      />
    </>
  );
}
