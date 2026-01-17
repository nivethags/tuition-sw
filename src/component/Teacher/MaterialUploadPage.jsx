import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";

const MaterialUploadPage = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, name: "Tamil" }]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [file, setFile] = useState(null);

  // 🔄  Pull subjects from API (replace endpoint)
  useEffect(() => {
    fetch("/api/subjects")
      .then((res) => res.json())
      .then(setSubjects)
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !selectedSubject) return;

    const formData = new FormData();
    formData.append("subjectId", selectedSubject);
    formData.append("file", file);

    await fetch("/api/materials", {
      method: "POST",
      body: formData,
    });

    alert("Material uploaded successfully 🎉");
    setSelectedSubject("");
    setFile(null);
  };

  return (
    <Paper sx={{ maxWidth: 500, mx: "auto", mt: 6, p: 4 }}>
      <Typography variant="h5" mb={3}>
        Upload Study Material
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            select
            label="Subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            required
          >
            {subjects.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.name}
              </MenuItem>
            ))}
          </TextField>

          <Button variant="outlined" component="label">
            Choose File
            <input
              type="file"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </Button>

          {file && (
            <Typography fontSize="0.9rem" color="text.secondary">
              Selected: {file.name}
            </Typography>
          )}

          <Button type="submit" variant="contained" disabled={!file}>
            Upload
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default MaterialUploadPage;
