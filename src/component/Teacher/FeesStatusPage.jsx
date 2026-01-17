// FeesStatusPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { green, red, orange } from "@mui/material/colors";
import { Select, MenuItem } from "@mui/material";


/* ---------- Fee status enum ---------- */
const STATUS = {
  PAID: "Paid",
  UNPAID: "Unpaid",
  PARTIAL: "Partial",
};
const nextStatus = (curr) =>
  curr === STATUS.UNPAID
    ? STATUS.PARTIAL
    : curr === STATUS.PARTIAL
    ? STATUS.PAID
    : STATUS.UNPAID;

/* ---------- Cell renderer for colour‑coded chips ---------- */
const StatusChip = ({ value }) => {
  const color =
    value === STATUS.PAID
      ? green[600]
      : value === STATUS.PARTIAL
      ? orange[600]
      : red[600];
  return (
    <Chip
      label={value}
      sx={{ backgroundColor: color, color: "white", width: 80 }}
      size="small"
    />
  );
};

const FeesStatusPage = () => {
  const [rows, setRows] = useState([
  {
    id: 1,
    name: "Arun Kumar",
    class: "IX‑A",
    due: 1200,
    dueDate: "2025‑07‑10",
    status: "Unpaid",
  },
  {
    id: 2,
    name: "Bhavya Sharma",
    class: "IX‑A",
    due: 600,
    dueDate: "2025‑07‑15",
    status: "Partial",
  },
  {
    id: 3,
    name: "Chirag Rao",
    class: "IX‑B",
    due: 0,
    dueDate: "—",
    status: "Paid",
  },
  {
    id: 4,
    name: "Deepika S.",
    class: "IX‑B",
    due: 1500,
    dueDate: "2025‑07‑08",
    status: "Unpaid",
  },
  {
    id: 5,
    name: "Ehsan Ali",
    class: "IX‑C",
    due: 300,
    dueDate: "2025‑07‑20",
    status: "Partial",
  },
  {
    id: 6,
    name: "Farah Khan",
    class: "IX‑C",
    due: 0,
    dueDate: "—",
    status: "Paid",
  },
  {
    id: 7,
    name: "Gopi Menon",
    class: "IX‑D",
    due: 900,
    dueDate: "2025‑07‑18",
    status: "Unpaid",
  },
  {
    id: 8,
    name: "Harini R.",
    class: "IX‑D",
    due: 0,
    dueDate: "—",
    status: "Paid",
  },
  {
    id: 9,
    name: "Ishaan Verma",
    class: "IX‑E",
    due: 450,
    dueDate: "2025‑07‑12",
    status: "Partial",
  },
  {
    id: 10,
    name: "Jyoti Patel",
    class: "IX‑E",
    due: 1250,
    dueDate: "2025‑07‑22",
    status: "Unpaid",
  }]);
  // sampleRows.js  (or inline in FeesStatusPage.jsx)
const sampleRows = [
  {
    id: 1,
    name: "Arun Kumar",
    class: "IX‑A",
    due: 1200,
    dueDate: "2025‑07‑10",
    status: "Unpaid",
  },
  {
    id: 2,
    name: "Bhavya Sharma",
    class: "IX‑A",
    due: 600,
    dueDate: "2025‑07‑15",
    status: "Partial",
  },
  {
    id: 3,
    name: "Chirag Rao",
    class: "IX‑B",
    due: 0,
    dueDate: "—",
    status: "Paid",
  },
  {
    id: 4,
    name: "Deepika S.",
    class: "IX‑B",
    due: 1500,
    dueDate: "2025‑07‑08",
    status: "Unpaid",
  },
  {
    id: 5,
    name: "Ehsan Ali",
    class: "IX‑C",
    due: 300,
    dueDate: "2025‑07‑20",
    status: "Partial",
  },
  {
    id: 6,
    name: "Farah Khan",
    class: "IX‑C",
    due: 0,
    dueDate: "—",
    status: "Paid",
  },
  {
    id: 7,
    name: "Gopi Menon",
    class: "IX‑D",
    due: 900,
    dueDate: "2025‑07‑18",
    status: "Unpaid",
  },
  {
    id: 8,
    name: "Harini R.",
    class: "IX‑D",
    due: 0,
    dueDate: "—",
    status: "Paid",
  },
  {
    id: 9,
    name: "Ishaan Verma",
    class: "IX‑E",
    due: 450,
    dueDate: "2025‑07‑12",
    status: "Partial",
  },
  {
    id: 10,
    name: "Jyoti Patel",
    class: "IX‑E",
    due: 1250,
    dueDate: "2025‑07‑22",
    status: "Unpaid",
  },
];
const handleStatusChange = (id, newStatus) => {
  setRows((prev) =>
    prev.map((row) =>
      row.id === id ? { ...row, status: newStatus } : row
    )
  );
  setDirtyIds((prev) => ({ ...prev, [id]: true }));
};

  const [dirtyIds, setDirtyIds] = useState({}); // { id: true }

  /* ---------- Load students + fee info ---------- */
  useEffect(() => {
    // 🔧 Replace with GET /api/fees when your backend is ready
    fetch("/api/fees")
      .then((r) => r.json())
      .then(setRows)
      .catch(console.error);
  }, []);

  /* ---------- Toggle a student’s status ---------- */
  const handleToggle = (id) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, status: nextStatus(row.status) } : row
      )
    );
    setDirtyIds((prev) => ({ ...prev, [id]: true })); // mark as unsaved
  };

  /* ---------- Save all unsaved edits at once ---------- */
  const handleSave = async () => {
    const updates = rows.filter((r) => dirtyIds[r.id]);
    if (!updates.length) return alert("Nothing to save 🙂");

    // 🔧 Replace with PUT /api/fees/bulk
    await fetch("/api/fees/bulk", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    setDirtyIds({});
    alert("Fee status updated ✔️");
  };

  /* ---------- Columns ---------- */
  const columns = useMemo(
  () => [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Student", flex: 1, minWidth: 140 },
    { field: "class", headerName: "Class", width: 100 },
    {
      field: "due",
      headerName: "Amount Due",
      type: "number",
      width: 130,
      valueFormatter: ({ value }) => `₹${value}`,
    },
    { field: "dueDate", headerName: "Due Date", width: 120 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: ({ row }) => (
        <Select
          value={row.status}
          size="small"
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          sx={{ fontSize: 13, width: "100%" }}
        >
          {Object.values(STATUS).map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      ),
    },
  ],
  []
);


  return (
    <Paper sx={{ p: 3, mt: 5 }}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Fee Status</Typography>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!Object.keys(dirtyIds).length}
        >
          Save Changes
        </Button>
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

export default FeesStatusPage;
