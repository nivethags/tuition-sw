import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style/UploadTimeTable.css';

const UploadTimetable = () => {
  const [standards, setStandards] = useState([]);
  const [selectedStandard, setSelectedStandard] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [message, setMessage] = useState('');
  const [batch, setBatch] = useState('');


  useEffect(() => {
    const fetchStandards = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/classes");

        // Remove duplicate standards
        const uniqueStandards = Array.from(
          new Set(response.data.map(item => item.standard))
        ).map(std => ({ standard: std }));

        setStandards(uniqueStandards);

      } catch (error) {
        console.error("Error fetching standards:", error);
      }
    };

    fetchStandards();
  }, []);

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedStandard || !csvFile) {
      setMessage('Please select a standard and upload a file');
      return;
    }

    const formData = new FormData();
    formData.append('standard', selectedStandard);
    formData.append('batch', batch);
    formData.append('timetable', csvFile);

    try {
      setMessage('Uploading...');
      const response = await axios.post(
        'http://localhost:5000/admin/timetable/upload',
        formData
      );

      setMessage(response.data.message || `Upload successful! ${response.data.insertedRows} rows inserted.`);

      // Clear form
      setSelectedStandard('');
      setCsvFile(null);
      document.querySelector('input[type="file"]').value = '';

    } catch (error) {
      setMessage(error.response?.data?.message || 'Upload failed');
      console.error(error);
    }
  };

  return (
    <div className="upload-timetable">
      <h2>Upload Timetable (CSV)</h2>

      <label>Select Standard:</label>
      <select
        value={selectedStandard}
        onChange={(e) => setSelectedStandard(e.target.value)}
      >
        <option value="">-- Choose Standard --</option>
        {standards.map((std, index) => (
          <option key={index} value={std.standard}>
            {std.standard}
          </option>
        ))}
      </select>

      <label>Select Batch:</label>
<select value={batch} onChange={(e) => setBatch(e.target.value)}>
  <option value="">-- Choose Batch --</option>
  <option value="Morning">Morning</option>
  <option value="Evening">Evening</option>
</select>


      {selectedStandard && (
        <>
          <label>Select CSV File:</label>
          <input type="file" accept=".csv" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
        </>
      )}

      {message && <p className="upload-message">{message}</p>}
    </div>
  );
};

export default UploadTimetable;
