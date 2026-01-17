import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/UploadMarks.css";

const UploadMarks = () => {
  const [standard, setStandard] = useState("");
  const [batch, setBatch] = useState("");
  const [examType, setExamType] = useState("");
  const [students, setStudents] = useState([]);
  const [classList, setClassList] = useState([]);
  const [batches, setBatches] = useState([]);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  /* =========================
     Fetch students by standard
  ========================== */
  useEffect(() => {
    if (standard) {
      axios
        .get(`http://localhost:5000/admin/student/${standard}`)
        .then((res) => setStudents(res.data.info || []))
        .catch((err) =>
          console.error("Failed to fetch students", err)
        );
    } else {
      setStudents([]);
    }
  }, [standard]);

  /* =========================
     Fetch standards
  ========================== */
  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/get-all-subjects")
      .then((res) => {
        console.log("Fetched standards:", res.data);
        setClassList(res.data);
      })
      .catch((err) =>
        console.error("Error fetching standards:", err)
      );
  }, []);

  /* =========================
     Fetch batches by standard
  ========================== */
  useEffect(() => {
    if (standard) {
      axios
        .get(`http://localhost:5000/admin/get-all-batches/${standard}`)
        .then((res) => {
          console.log("Fetched batches:", res.data);
          setBatches(res.data);
        })
        .catch((err) =>
          console.error("Error fetching batches:", err)
        );
    } else {
      setBatches([]);
    }
  }, [standard]);

  /* =========================
     File upload handler
  ========================== */
  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("Selected file:", selectedFile.name);
    }
  };

  /* =========================
     Submit handler
  ========================== */
  const handleSubmit = async () => {
    if (!standard || !batch || !examType || !file) {
      alert("Please select standard, batch, exam type and upload a file");
      return;
    }

    const formData = new FormData();
    const payload = { standard, batch, examType };

    formData.append("data", JSON.stringify(payload));
    formData.append("file", file);

    try {
      setStatus("Uploading...");
      const response = await axios.post(
        "http://localhost:5000/admin/upload-marks",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Response:", response.data);
      setStatus(
        `Upload successful! Inserted ${response.data.inserted} marks`
      );

      alert("Marks uploaded successfully!");
      setFile(null);
    } catch (err) {
      console.error(
        "Error uploading marks:",
        err.response?.data || err.message
      );

      const errorData = err.response?.data;
      let errorMessage = "Upload failed";

      if (errorData?.missingStudents?.length) {
        errorMessage = `Students not found: ${errorData.missingStudents.join(
          ", "
        )}`;
      } else if (errorData?.message) {
        errorMessage = errorData.message;
      } else if (errorData?.error) {
        errorMessage = errorData.error;
      }

      setStatus(errorMessage);
      alert(`Failed to upload marks: ${errorMessage}`);
    }
  };

  /* =========================
     UI
  ========================== */
  return (
    <div className="upload-marks-container">
      <h2>📑 Upload Marks</h2>

      {status && <p className="status-message">{status}</p>}

      <div className="form-group">
        {/* STANDARD */}
        <select
          value={standard}
          onChange={(e) => setStandard(e.target.value)}
        >
          <option value="">Select Standard</option>
          {[...new Set(classList.map((c) => c.standard))].map(
            (std, index) => (
              <option key={index} value={std}>
                {std}
              </option>
            )
          )}
        </select>

        {/* BATCH */}
        <select value={batch} onChange={(e) => setBatch(e.target.value)}>
          <option value="">Select Batch</option>
          {[...new Set(batches.map((b) => b.batch))].map(
            (b, index) => (
              <option key={index} value={b}>
                {b}
              </option>
            )
          )}
        </select>

        {/* EXAM TYPE */}
        <input
          type="text"
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
          placeholder="Enter exam name"
        />

        {/* FILE */}
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
        />
      </div>

      {/* STUDENT PREVIEW */}
      {students.length > 0 && (
        <table className="marks-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr key={student.id}>
                <td>{idx + 1}</td>
                <td>{student.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button className="submit-btn" onClick={handleSubmit}>
        Upload Marks
      </button>
    </div>
  );
};

export default UploadMarks;
