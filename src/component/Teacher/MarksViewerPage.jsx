import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

/* ---------- Simple filters ---------- */
const CLASS_OPTIONS = ["All", "IX‑A", "IX‑B", "IX‑C", "IX‑D", "IX‑E"];
const EXAM_OPTIONS  = ["All", "Mid‑Term", "Final"];

export default function MarksViewerPage() {
  const [rows,    setRows]    = useState([]);
  const [columns, setColumns] = useState([]);
  const [klass,   setKlass]   = useState("All");
  const [exam,    setExam]    = useState("All");

  /* ---------- Load marks whenever filters change ---------- */
  useEffect(() => {
    const params = new URLSearchParams();
    if (klass !== "All") params.append("class", klass);
    if (exam  !== "All") params.append("exam",  exam);

    fetch(`/api/marks?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.length) {
          setRows([]); setColumns([]); return;
        }

        /* Dynamically build columns from first row */
        const cols = Object.keys(data[0]).map((key) => ({
          field: key,
          headerName: key,
          flex: key === "name" ? 1 : undefined,
          minWidth: key === "name" ? 150 : 90,
          type: typeof data[0][key] === "number" ? "number" : "string",
        }));

        setColumns(cols);
        setRows(data);
      })
      .catch(console.error);
  }, [klass, exam]);

  /* ---------- Fallback while no data ---------- */
  const gridCols = useMemo(
    () =>
      columns.length
        ? columns
        : [{ field: "__empty", headerName: "No data", width: 200 }],
    [columns]
  );

  return (
    <Paper sx={{ p: 3, mt: 5 }}>
      {/* ---------- Header ---------- */}
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Student Marks</Typography>

        <Stack direction="row" spacing={2}>
          {/* Class filter */}
          <FormControl size="small" sx={{ minWidth: 110 }}>
            <InputLabel>Class</InputLabel>
            <Select
              label="Class"
              value={klass}
              onChange={(e) => setKlass(e.target.value)}
            >
              {CLASS_OPTIONS.map((opt) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Exam filter */}
          <FormControl size="small" sx={{ minWidth: 110 }}>
            <InputLabel>Exam</InputLabel>
            <Select
              label="Exam"
              value={exam}
              onChange={(e) => setExam(e.target.value)}
            >
              {EXAM_OPTIONS.map((opt) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      {/* ---------- Data grid ---------- */}
      <Box sx={{ height: 520 }}>
        <DataGrid
          rows={rows}
          columns={gridCols}
          pageSize={10}
          disableSelectionOnClick
          getRowId={(r) => r.id}
        />
      </Box>
    </Paper>
  );
}
