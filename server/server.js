require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// ============================
// CONNECT TO MONGODB
// ============================
connectDB();

// ============================
// MIDDLEWARE
// ============================
app.use(cors());
app.use(express.json());

// ============================
// API ROUTES
// ============================
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);

// ============================
// TEST ROUTE
// ============================
app.get("/", (req, res) => {
    res.json({
        message: "ITI Apprenticeship Portal API is running"
    });
});

// ============================
// START SERVER
// ============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});