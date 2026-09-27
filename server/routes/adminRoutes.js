const express = require("express");

const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// =====================================
// GET ADMIN DASHBOARD STATISTICS
// ADMIN ONLY
// =====================================
router.get(
    "/stats",
    protect,
    authorize("admin"),
    async (req, res) => {
        try {
            const totalUsers = await User.countDocuments();

            const totalStudents = await User.countDocuments({
                role: "student"
            });

            const totalEmployers = await User.countDocuments({
                role: "employer"
            });

            const totalJobs = await Job.countDocuments();

            const activeJobs = await Job.countDocuments({
                status: "active"
            });

            const totalApplications = await Application.countDocuments();

            const pendingApplications = await Application.countDocuments({
                status: "pending"
            });

            const selectedApplications = await Application.countDocuments({
                status: "selected"
            });

            res.json({
                totalUsers,
                totalStudents,
                totalEmployers,
                totalJobs,
                activeJobs,
                totalApplications,
                pendingApplications,
                selectedApplications
            });
        } catch (error) {
            console.error("Admin stats error:", error.message);

            res.status(500).json({
                message: "Server error while fetching admin statistics."
            });
        }
    }
);

// =====================================
// GET ALL USERS
// ADMIN ONLY
// =====================================
router.get(
    "/users",
    protect,
    authorize("admin"),
    async (req, res) => {
        try {
            const users = await User.find()
                .select("-password")
                .sort({ createdAt: -1 });

            res.json(users);
        } catch (error) {
            console.error("Admin users error:", error.message);

            res.status(500).json({
                message: "Server error while fetching users."
            });
        }
    }
);

// =====================================
// GET ALL JOBS
// ADMIN ONLY
// =====================================
router.get(
    "/jobs",
    protect,
    authorize("admin"),
    async (req, res) => {
        try {
            const jobs = await Job.find()
                .populate("postedBy", "name email")
                .sort({ createdAt: -1 });

            res.json(jobs);
        } catch (error) {
            console.error("Admin jobs error:", error.message);

            res.status(500).json({
                message: "Server error while fetching jobs."
            });
        }
    }
);

// =====================================
// DELETE USER
// ADMIN ONLY
// =====================================
router.delete(
    "/users/:id",
    protect,
    authorize("admin"),
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id);

            if (!user) {
                return res.status(404).json({
                    message: "User not found."
                });
            }

            await User.findByIdAndDelete(req.params.id);

            res.json({
                message: "User deleted successfully."
            });
        } catch (error) {
            console.error("Delete user error:", error.message);

            res.status(500).json({
                message: "Server error while deleting user."
            });
        }
    }
);

module.exports = router;