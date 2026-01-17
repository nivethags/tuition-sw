import React, { useState } from "react";
import * as XLSX from "xlsx";
import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const MarkUploadPage = () => {
  const [rows, setRows] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setRows(json); // 2‑D array
    };
    reader.readAsArrayBuffer(f);
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await fetch("/api/marks", {
      method: "POST",
      body: formData,
    });

    alert("Marks uploaded 🏆");
    setRows([]);
    setFile(null);
  };

  return (
    <Paper sx={{ maxWidth: "90%", mx: "auto", mt: 6, p: 4 }}>
      <Typography variant="h5" mb={3}>
        Upload Marks (Excel)
      </Typography>

      <Stack spacing={3} direction={{ xs: "column", sm: "row" }}>
        <Button variant="outlined" component="label">
          Choose Excel
          <input
            type="file"
            accept=".xlsx,.xls"
            hidden
            onChange={handleFileChange}
            required
          />
        </Button>

        <Button
          variant="contained"
          disabled={!file}
          onClick={handleSubmit}
        >
          Upload
        </Button>
      </Stack>

      {/* 🔍 Preview first few rows */}
      {rows.length > 0 && (
        <Box mt={4} sx={{ overflowX: "auto" }}>
          <Typography fontWeight={600} mb={1}>
            Preview
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                {rows[0].map((h, idx) => (
                  <TableCell key={idx}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(1, 6).map((r, i) => (
                <TableRow key={i}>
                  {r.map((cell, j) => (
                    <TableCell key={j}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Typography fontSize="0.8rem" color="text.secondary" mt={1}>
            Showing first 5 rows
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default MarkUploadPage;