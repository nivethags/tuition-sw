require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const db = require("./db");

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  console.log("MYSQLHOST:", process.env.MYSQLHOST);
console.log("MYSQLUSER:", process.env.MYSQLUSER);
console.log("MYSQLDATABASE:", process.env.MYSQLDATABASE);
console.log("MYSQLPORT:", process.env.MYSQLPORT);

  res.send("Welcome");
});

// Routers
const teacherRouter = require("./teacher");
const adminRouter = require("./admin");

app.use("/teacher", teacherRouter);
app.use("/admin", adminRouter);

/* =========================
   SIGNUP
========================= */
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {

    db.query(
      "INSERT INTO user (user_id, password) VALUES (?, ?)",
      [username, password],
      (err) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ message: "Error creating user" });
        }

        res.status(201).json({
          message: "User created successfully",
          status: true,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* =========================
   LOGIN
========================= */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  db.query(
    "SELECT * FROM user WHERE user_id = ? AND password = ?",
    [username, password],
    async (err, result) => {
      console.log(`SELECT * FROM user WHERE user_id ='${username}' AND password='${password}'`);

      if (err) return res.status(500).json({ message: "DB error" });


      if (result.length === 0)
        return res.status(400).json({ message: "User not found" });

      const user = result[0];

  

      const token = jwt.sign(
        {
          id: user.id,
          username: user.user_id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        token,
        role: user.role,
        message: "Login successful",
      });
    }
  );
});

/* =========================
   AUTH MIDDLEWARE
========================= */
const validateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};


/* =========================
   PROFILE
========================= */
app.get("/profile", validateUser, (req, res) => {
  res.status(200).json({
    message: "Profile access granted",
    user: req.user,
  });
});

/* =========================
   SERVER
========================= */
app.listen(PORT, () =>
  console.log(`Backend running on port ${PORT}`)
);
