const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const mysql = require("mysql2");
const verifyToken = require("./middleware/verifyToken");

const router = express.Router();

router.use(express.json());
const db = require("./db");

const xlsx = require("xlsx");

router.use(express.json({ limit: "10mb" }));
router.use(express.urlencoded({ extended: true, limit: "10mb" }));


router.post('/addSubject', async (req, res) => {

  const subject = req.body;
  const { subjectName, subjectCode, standard } = subject;
  console.log(subject);

  db.query("INSERT INTO subject (subject,subject_code,standard) values (?,?,?)", [subjectName, subjectCode, standard], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ message: "error when interting data into student" })
    }
    return res.status(200).json({ message: "Subject is successfully added!", info: subject });
  })

})
router.get('/getTeacher', async (req, res) => {
  db.query("SELECT * FROM teacher", (err, result) => {
    if (err) {
      console.error("Error fetching teacher data:", err);
      return res.status(500).json({ message: "Error fetching teacher data" });
    }

    return res.status(200).json({ message: "Teachers fetched successfully", result });
  });
});
router.delete('/deletestudent/:id', async (req, res) => {
  const id = req.params.id;
  console.log(`Deleting student with id: ${id}`);
  db.query("DELETE FROM student WHERE id=?", [id], (err, result) => {
    if (err) {
      console.error("Error fetching teacher data:", err);
      return res.status(500).json({ message: "Error fetching while deleting student" });
    }

    return res.status(200).json({ message: "Student Removed successfully" });
  });
});


router.get('/student/:id/:batch', async (req, res) => {
  const id = req.params.id;
  const batch = req.params.batch;
  db.query("SELECT * FROM student WHERE standard=? and batch =?", [id, batch], (err, result) => {
    if (err) {
      console.error("Error fetching teacher data:", err);
      return res.status(500).json({ message: "Error fetching Fetching student" });
    }

    return res.status(200).json({ message: "Student Removed successfully", info: result });
  });
});

router.get('/get-class-student/:id', async (req, res) => {
  const id = req.params.id;
  console.log(`Deleting student with id: ${id}`);
  db.query("SELECT * FROM student WHERE id=?", [id], (err, result) => {
    if (err) {
      console.error("Error fetching teacher data:", err);
      return res.status(500).json({ message: "Error fetching Fetching student" });
    }

    return res.status(200).json({ message: "Student Removed successfully", info: result });
  });
});


router.put('/updatestudent/:id', async (req, res) => {
  const id = req.params.id;
  const student = req.body;
  console.log(`Updating student with id: ${id}`, student);

  db.query("UPDATE student SET name=?, standard=?, subject=?, email=?, batch=? WHERE id=?",
    [student.name, student.standard, student.subject, student.email, student.batch, id],
    (err, result) => {
      if (err) {
        console.error("Error updating student:", err);
        return res.status(500).json({ message: "Error updating student" });
      }
      return res.status(200).json({ message: "Student updated successfully", info: student });
    });
});

router.get('/teachers', async (req, res) => {
  db.query("SELECT * from teacher", (err, result) => {
    if (err) {
      console.error("Error fetching teachers:", err);
      return res.status(500).json({ message: "Error fetching teachers" });
    }
    console.log("Fetched teachers:", result);

    return res.status(200).json({ message: "Teachers fetched successfully", info: result });
  })
});

router.post('/add-teacher', async (req, res) => {
  const teacher = req.body;
  console.log("Adding Teacher:", teacher);
  db.query("INSERT INTO teacher (name, subjects, mail_id, phno,qualification) VALUES (?, ?, ?, ?,?)",
    [teacher.name, teacher.subject, teacher.email, teacher.phone, teacher.qualification],
    (err, result) => {
      if (err) {
        console.error("Error adding teacher:", err);
        return res.status(500).json({ message: "Error adding teacher" });
      }
      return res.status(200).json({ message: "Teacher added successfully", info: teacher });
    });
})

// Get teacher by ID
router.get('/teacher-detail/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM teacher WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
});

// Update teacher
router.put('/update-teacher/:id', (req, res) => {
  const { id } = req.params;
  const { name, subjects, mail_id, phno, qualification } = req.body;
  db.query(
    'UPDATE teacher SET name = ?, subjects = ?, mail_id = ?, phno = ?, qualification = ? WHERE id = ?',
    [name, subjects, mail_id, phno, qualification, id],
    (err, result) => {

      if (err) {
        console.log(err, "error whilw updating teacher's info");
        return res.status(500).send(err);

      }
      res.send('Teacher updated successfully');
    }
  );
});

router.delete('/delete-teachers/:id', async (req, res) => {
  const id = req.params.id;
  console.log(`Deleting student with id: ${id}`);

  db.query("DELETE FROM teacher WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting Teacher:", err);
      return res.status(500).json({ message: "Error deleting student" });
    }

    return res.status(200).json({ message: "Teacher removed successfully" });
  });
});


// Set up multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

const normalizeRow = (row) => {
  const obj = {};
  for (const key in row) {
    obj[key.toLowerCase().replace(/\s+/g, '').trim()] = row[key];
  }
  return obj;
};

router.post("/timetable/upload", upload.single("timetable"), (req, res) => {
  console.log("📥 Timetable upload API hit");

  console.log("🧾 Request body:", req.body);
  console.log("📁 Uploaded file:", req.file);

  const { standard, batch } = req.body;
  const filePath = req.file?.path;

  if (!standard || !batch || !filePath) {
    console.error("❌ Missing fields:", { standard, batch, filePath });
    return res.status(400).json({
      message: "Standard, batch, and file are required."
    });
  }

  const results = [];
  

  fs.createReadStream(filePath)
    .pipe(csv({ mapHeaders: ({ header }) => header.trim().replace(/^\uFEFF/, "") }))
    .on("data", (data) => {
      results.push(data);

      // Log only first row to avoid spam
      if (results.length === 1) {
        console.log("📄 First CSV row:", data);
      }
    })
    .on("end", () => {
      console.log(`✅ CSV parsing completed. Total rows: ${results.length}`);

      if (results.length === 0) {
        fs.unlinkSync(filePath);
        console.error("❌ CSV file is empty");
        return res.status(400).json({ message: "CSV file is empty." });
      }

      const insertQuery = `
        INSERT INTO timetable 
          (standard, subject, staff_name, day_of_week, start_time, end_time, batch, room)
        VALUES ?
      `;

      const values = results.map((row, index) => {
  const r = normalizeRow(row);

  const mappedRow = [
    parseInt(standard),

    r.subject || "Unknown",

    r.staff_name || "Not Assigned",

    r.day || "Monday",
    r.starttime || "08:30:00",
    r.endtime || "10:00:00",

    batch,
    r.room || "R1"
  ];

  if (index === 0) {
    console.log("🧩 Normalized row:", r);
    console.log("🧩 Final mapped row:", mappedRow);
  }

  return mappedRow;
});


      console.log("🧮 Total rows to insert:", values.length);

      db.query(insertQuery, [values], (err, result) => {
        fs.unlinkSync(filePath);

        if (err) {
          console.error("❌ Database insert error:", err);
          return res.status(500).json({
            message: "Database insert failed.",
            error: err.message
          });
        }

        console.log("✅ Database insert successful:", result);

        res.json({
          message: "Timetable uploaded successfully.",
          insertedRows: result.affectedRows
        });
      });
    })
    .on("error", (error) => {
      console.error("❌ CSV parse error:", error);
      res.status(500).json({
        message: "Failed to parse CSV file.",
        error: error.message
      });
    });
});


router.get('/get-timetable', (req, res) => {
  const today = new Date();
  const dayOfWeek = today.toLocaleString('en-US', { weekday: 'long' });
  console.log(`Fetching timetable for ${dayOfWeek} on ${today.toISOString()}`);
  db.query(
    `SELECT * FROM timetable WHERE day_of_week = ?`,
    [dayOfWeek],
    (err, results) => {
      if (err) {
        console.error("Error fetching today's timetable:", err);
        return res.status(500).json({ message: "Error fetching today's timetable" });
      }
      res.json({ info: results });
    }
  );
});

router.get('/edit-timetable/:id', (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM timetable WHERE id=?", [id], (error, result) => {
    if (error) {
      console.log("error while fetchinh timetable data ", error)
      return res.statusMessage(500).json({ message: `Error While eftching timtable for this id ${id}` })
    }
    console.log(`fetched time table data for ${id}`, result[0])
    return res.status(200).json(result[0]);
  })
})

router.put('/edit-timetable/:id', (req, res) => {
  const id = req.params.id;
  const { subject, staff_name, day, room } = req.body;
  console.log(`Updating timetable with id: ${id}`, req.body);
  db.query("UPDATE timetable SET subject=?, staff_name=? , day_of_week=?,room=? WHERE id=?", [subject, staff_name, day, room, id], (error, result) => {
    if (error) {
      console.log("error while updating timetable ", error);
      return res.status(500).json({ message: `Error while updating timetable for id ${id}` });
    }
    return res.status(200).json({ message: "Timetable updated successfully", info: result });
  })
});

router.delete('/delete-timetable/:id', (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM timetable WHERE id=?", [id], (error, result) => {
    if (error) {
      console.log("Error while Deleting Time table", error);
      return res.status(500).json({ message: "Error While Time Table is Deleted! " })
    }
    console.log("Successfully This Schedule is Removed! ", result);
    return res.status(200).json({ message: "Successfully Time Table is Deleted! " })
  })
})

router.post('/add-class', (req, res) => {
  const { standard, subject, batch } = req.body;
  const sql = "INSERT INTO classes (standard, subject, batch) VALUES (?, ?, ?)";

  db.query(sql, [standard, subject, batch], (err, result) => {
    if (err) {
      console.error("Error inserting class:", err);
      return res.status(500).json({ message: "Failed to add class" });
    }
    res.status(200).json({ message: "Class added successfully!" });
  });
});

router.get('/classes', (req, res) => {
  db.query('SELECT * FROM classes', (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(200).json(result);
  });
});

// POST new class
// router.post('/add-class', (req, res) => {
//   const { standard, subject, batch } = req.body;
//   db.query('INSERT INTO classes (standard, subject, batch) VALUES (?, ?, ?)', [standard, subject, batch], (err, result) => {
//     if (err) return res.status(500).json({ message: err.message });
//     res.status(201).json({ message: 'Class added successfully!' });
//   });
// });

// PUT update class
router.put('/update-class/:id', (req, res) => {
  const { standard, subject, batch } = req.body;
  const id = req.params.id;
  db.query('UPDATE classes SET standard=?, subject=?, batch=? WHERE id=?', [standard, subject, batch, id], (err, result) => {
    if (err) {
      console.error("Error updating class:", err);
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json({ message: 'Class updated successfully!' });
  });
});

// DELETE class
router.delete('/delete-class/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM classes WHERE id=?', [id], (err, result) => {
    if (err) {
      console.error("Error deleting class:", err);
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json({ message: 'Class deleted successfully!' });
  });
});


// router.get('/classes', (req, res) => {
//   db.query('SELECT id, standard, section FROM classes', (err, results) => {
//     if (err) return res.status(500).json({ error: err });
//     console.log("Fetched classes:", results);
//     res.json(results);
//   });
// });
router.get('/getsubjects', (req, res) => {
  const { standard } = req.query;

  if (!standard) {
    return res.status(400).json({ error: 'Standard is required' });
  }

  const sql = 'SELECT id, subject, subject_code, teacher_id FROM subject WHERE standard = ?';
  db.query(sql, [standard], (err, results) => {
    if (err) {
      console.error('Error fetching subjects:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json(results);
  });
});

router.get('/get-all-subjects', (req, res) => {

  const sql = 'SELECT * FROM classes ';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching subjects:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json(results);
  });
});


router.get('/get-all-batches/:classId', (req, res) => {
  const classId = req.params.classId;
  const sql = 'SELECT batch FROM student WHERE standard = ? GROUP BY batch';
  // console.log(`SELECT batch FROM student WHERE standard = ${classId} GROUP BY batch `);
  db.query(sql, [classId], (err, results) => {
    if (err) {
      console.error('Error fetching subjects:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json(results);
  });
});

router.get('/attendance/:classId/:batch', (req, res) => {
  const { classId, batch } = req.params;

  const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
  console.log(`SELECT * FROM attendance_records WHERE class_id = ${classId} and batch = '${batch}' and date = '${today}'`);
  db.query("SELECT * FROM  attendance_records WHERE class_id =? and batch= ? and date = CURDATE()", [classId, batch], (error, result) => {

    if (error) {
      console.log(error, "error while getting attendance before update");
      return res.status(500).json({ message: "Error while getting attendance before update", reason: error });
    }

    res.status(200).json({ message: "Your Attendance is Fetched Successfully", list: result });

  })

});

router.post('/attendance', (req, res) => {
  const { classId, batch, students } = req.body;
  let { date } = req.body;

  // ✅ Normalize the date to YYYY-MM-DD once at the top
  date = new Date(date).toISOString().split('T')[0];

  console.log("Updating attendance record", req.body);

  const attendanceValues = students.map(student => ({
    student_id: student.id,
    class_id: classId,
    date, // ✅ Use normalized date
    status: student.status ? "Present" : "Absent", // 1 for present, 0 for absent
    batch
  }));



  let completed = 0;
  const errors = [];

  attendanceValues.forEach((record) => {
    const checkQuery = "SELECT * FROM attendance_records WHERE student_id = ? AND class_id = ? AND date = ? AND batch = ?";
    const insertQuery = "INSERT INTO attendance_records (student_id, class_id, date, status, batch) VALUES (?, ?, ?, ?, ?)";
    const updateQuery = "UPDATE attendance_records SET status = ? WHERE student_id = ? AND class_id = ? AND date = ? AND batch = ?";

    db.query(checkQuery, [record.student_id, record.class_id, record.date, record.batch], (err, result) => {
      if (err) {
        errors.push({ studentId: record.student_id, error: err });
        checkDone();
        return;
      }

      if (result.length > 0) {
        db.query(updateQuery, [record.status, record.student_id, record.class_id, record.date, record.batch], (err2) => {
          if (err2) errors.push({ studentId: record.student_id, error: err2 });
          checkDone();
        });
      } else {
        db.query(insertQuery, [record.student_id, record.class_id, record.date, record.status, record.batch], (err3) => {
          if (err3) errors.push({ studentId: record.student_id, error: err3 });
          checkDone();
        });
      }
    });
  });

  function checkDone() {
    completed++;
    if (completed === attendanceValues.length) {
      if (errors.length > 0) {
        console.error("Attendance errors:", errors);
        return res.status(500).json({ message: 'Some attendance updates failed', errors });
      }
      res.json({ message: 'Attendance saved or updated successfully for all students.' });
    }
  }
});


// routes/assign.js
router.post('/assign-staff', (req, res) => {
  const { teacherId, standard, subjects } = req.body;

  if (!teacherId || !standard || !Array.isArray(subjects) || subjects.length === 0) {
    return res.status(400).json({ error: 'teacherId, standard, and at least one subject are required' });
  }

  const sql1 = 'UPDATE teacher SET standard = ? WHERE id = ?';
  const sql2 = 'UPDATE subject SET teacher_id = ? WHERE id = ?';

  // Update teacher's standard
  db.query(sql1, [standard, teacherId], (err1, result1) => {
    if (err1) return res.status(500).json({ error: err1 });

    // Now assign each subject
    let completed = 0;
    let errorOccurred = false;

    subjects.forEach(subjectId => {
      db.query(sql2, [teacherId, subjectId], (err2) => {
        if (err2 && !errorOccurred) {
          errorOccurred = true;
          return res.status(500).json({ error: err2 });
        }

        completed++;
        if (completed === subjects.length && !errorOccurred) {
          res.json({ message: 'Teacher assigned to class and subjects successfully' });
        }
      });
    });
  });
});

// GET /admin/students/:classId
router.get('/students/:classId', (req, res) => {
  const sql = 'SELECT id, name FROM student WHERE class_id = ?';
  db.query(sql, [req.params.classId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

// GET /admin/students/:classId
router.get('/student/:id', (req, res) => {
  // console.log(`Fetching student with id: ${req.params.id}`);
  const stud_id = req.params.id;
  const sql = 'SELECT * FROM student WHERE id = ?';
  console.log(`SELECT * FROM student WHERE id = ${req.params.id}`);

  db.query(sql, [stud_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

router.post("/upload-marks", upload.single("file"), async (req, res) => {
  // console.log("Received file:", req.file);
  // console.log("Received data:", req.body.data);

  try {
    /* =========================
       STEP 1: Parse JSON data
    ========================== */
    let parsedData;
    try {
      parsedData = JSON.parse(req.body.data);
    } catch (e) {
      return res.status(400).json({
        error: "Invalid JSON format in 'data'",
      });
    }

    const { standard, batch, examType } = parsedData;
// console.log("Parsed Data:", { standard, batch, examType }); 

    const file = req.file;

    if (!standard || !batch || !examType || !file) {
      return res.status(400).json({
        error: "standard, batch, examType, and file are required",
      });
    }

    const normalizedStandard = String(standard).trim();
    const normalizedBatch = batch.trim().toLowerCase();

    /* =========================
       STEP 2: Read Excel file
    ========================== */
    const workbook = xlsx.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(
      workbook.Sheets[sheetName],
      { header: 1 }
    );

    // console.log("Raw Excel Data:", sheetData);

    /* =========================
       STEP 3: Detect header row
    ========================== */
    let dataStartIndex = 0;
    for (let i = 0; i < sheetData.length; i++) {
      if (
        sheetData[i] &&
        sheetData[i].some(
          (cell) =>
            typeof cell === "string" &&
            cell.toLowerCase().includes("s.no")
        )
      ) {
        dataStartIndex = i + 1;
        break;
      }
    }

    /* =========================
       STEP 4: Extract student rows
    ========================== */
    const studentData = [];

    for (let i = dataStartIndex; i < sheetData.length; i++) {
      const row = sheetData[i];

      if (row && row.filter((c) => c !== undefined && c !== "").length >= 4) {
        const mark = Number(row[3]);
        if (isNaN(mark)) continue;

        studentData.push({
          sNo: row[0],
          name: row[1]?.trim(),
          subject: row[2],
          mark,
        });
      }
    }

    // console.log("Processed Student Data:", studentData);

    if (studentData.length === 0) {
      fs.unlinkSync(file.path);
      return res.status(400).json({
        error: "No valid student data found in Excel file",
      });
    }

    /* =========================
       STEP 5: Utility function
    ========================== */
    const runQuery = (sql, values) =>
      new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });

    /* =========================
       STEP 6: Normalize names
    ========================== */
    const studentNames = studentData.map((s) =>
      s.name.toLowerCase().trim()
    );

    console.log("Excel Names:", studentNames);
    console.log("Standard:", normalizedStandard);
    console.log("Batch:", normalizedBatch);

    /* =========================
       STEP 7: Query students
    ========================== */
    const studentQuery = `
      SELECT id, LOWER(TRIM(name)) AS name
      FROM student
      WHERE LOWER(TRIM(name)) IN (?)
        AND TRIM(standard) = ?
        AND LOWER(TRIM(batch)) = ?
    `;

    const studentResults = await runQuery(studentQuery, [
      studentNames,
      normalizedStandard,
      normalizedBatch,
    ]);

    // console.log("Found students:", studentResults);

    /* =========================
       STEP 8: Map name → id
    ========================== */
    const studentIdMap = {};
    studentResults.forEach((s) => {
      studentIdMap[s.name] = s.id;
    });

    const validStudentData = studentData.filter(
      (s) => studentIdMap[s.name.toLowerCase().trim()]
    );

    const missingStudents = studentData.filter(
      (s) => !studentIdMap[s.name.toLowerCase().trim()]
    );

    if (validStudentData.length === 0) {
      fs.unlinkSync(file.path);
      return res.status(404).json({
        error: "No valid students found in DB",
        missingStudents: missingStudents.map((s) => s.name),
      });
    }

    /* =========================
       STEP 9: Insert marks
    ========================== */
    const insertSQL = `
      INSERT INTO marks 
        (class_id, batch, exam_type, student_name, subject, mark)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    for (const student of validStudentData) {
      await runQuery(insertSQL, [
        normalizedStandard,
        normalizedBatch,
        examType,
        studentIdMap[student.name.toLowerCase().trim()],
        student.subject,
        student.mark,
      ]);
    }

    fs.unlinkSync(file.path);

    res.json({
      message: "Marks uploaded successfully",
      inserted: validStudentData.length,
      missing: missingStudents.length,
      missingStudents: missingStudents.map((s) => s.name),
    });
  } catch (err) {
    console.error("Error handling upload:", err);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      error: "Internal Server Error",
      message: err.message || "Unexpected error",
    });
  }
});


// GET /admin/report
router.get("/report", (req, res) => {
  const { classId, examType, month } = req.query;

  console.log("📥 Report API Hit:", req.query);

  if (!classId || !examType || !month) {
    return res.status(400).json({
      error: "classId, examType, and month are required",
    });
  }

  // Extract month number from YYYY-MM
  const monthNumber = new Date(month + "-01").getMonth() + 1;

  /* ---------------- MARKS QUERY ---------------- */
  const marksSql = `
    SELECT 
      s.id AS studentId,
      s.name AS studentName,
      SUM(m.mark) AS marks
    FROM marks m
    JOIN student s ON s.id = m.student_name
    WHERE s.standard = ?
      AND m.batch = ?
      AND MONTH(m.created_at) = ?
    GROUP BY s.id, s.name
    ORDER BY marks DESC
  `;

  /* ---------------- ATTENDANCE QUERY ---------------- */
  const attendanceSql = `
    SELECT
      s.id AS studentId,
      s.name AS studentName,
      ROUND(
        (SUM(CASE WHEN ar.status = 'Present' THEN 1 ELSE 0 END) / COUNT(ar.id)) * 100,
        2
      ) AS attendance
    FROM attendance_records ar
    JOIN student s ON s.id = ar.student_id
    WHERE ar.class_id = ?
      AND ar.batch = ?
      AND MONTH(ar.date) = ?
    GROUP BY s.id, s.name
  `;

  db.query(marksSql, [classId, examType, monthNumber], (err, marksData) => {
    if (err) {
      console.error("❌ Marks Query Error:", err);
      return res.status(500).json({ error: "Marks query failed" });
    }

    db.query(
      attendanceSql,
      [classId, examType, monthNumber],
      (err, attendanceData) => {
        if (err) {
          console.error("❌ Attendance Query Error:", err);
          return res.status(500).json({ error: "Attendance query failed" });
        }

        console.log("✅ Marks Data:", marksData);
        console.log("✅ Attendance Data:", attendanceData);

        res.status(200).json({
          marksData,
          attendanceData,
        });
      }
    );
  });
});

router.put("/update-password", verifyToken, async (req, res) => {
  const { userName, newPassword } = req.body;
  const userId = req.user.id;
  // console.log(`User ${userId} requests password change`);

  if (!userName || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    db.query(
      "SELECT * FROM user WHERE id = ?",
      [userId],
      (err, result) => {
        if (err) return res.status(500).json({ message: "DB error" });

        if (!result.length) {
          return res.status(404).json({ message: "User not found" });
        }

        db.query(
          "UPDATE user SET password = ? , user_id = ? WHERE id = ?",
          [newPassword, userName, userId],
          () => res.json({ message: "Password updated successfully" })
        );
      }
    );
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;