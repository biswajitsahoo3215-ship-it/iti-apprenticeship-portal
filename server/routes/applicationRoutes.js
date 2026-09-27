const express = require("express");

const Application = require("../models/Application");
const Job = require("../models/Job");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// =====================================
// APPLY FOR A JOB
// STUDENT ONLY
// =====================================
router.post(
    "/",
    protect,
    authorize("student"),
    async (req, res) => {
        try {
            const { jobId, coverLetter } = req.body;

            if (!jobId) {
                return res.status(400).json({
                    message: "Job ID is required."
                });
            }

            const job = await Job.findById(jobId);

            if (!job) {
                return res.status(404).json({
                    message: "Job not found."
                });
            }

            if (job.status !== "active") {
                return res.status(400).json({
                    message: "This apprenticeship is no longer active."
                });
            }

            const existingApplication = await Application.findOne({
                student: req.user._id,
                job: jobId
            });

            if (existingApplication) {
                return res.status(400).json({
                    message: "You have already applied for this apprenticeship."
                });
            }

            const application = await Application.create({
                student: req.user._id,
                job: jobId,
                coverLetter
            });

            res.status(201).json({
                message: "Application submitted successfully.",
                application
            });
        } catch (error) {
            console.error("Apply error:", error.message);

            res.status(500).json({
                message: "Server error while applying."
            });
        }
    }
);

// =====================================
// GET MY APPLICATIONS
// STUDENT ONLY
// =====================================
router.get(
    "/my",
    protect,
    authorize("student"),
    async (req, res) => {
        try {
            const applications = await Application.find({
                student: req.user._id
            })
                .populate("job")
                .sort({ createdAt: -1 });

            res.json(applications);
        } catch (error) {
            console.error("My applications error:", error.message);

            res.status(500).json({
                message: "Server error while fetching applications."
            });
        }
    }
);

// =====================================
// GET APPLICATIONS FOR EMPLOYER'S JOBS
// EMPLOYER ONLY
// =====================================
router.get(
    "/employer",
    protect,
    authorize("employer"),
    async (req, res) => {
        try {
            const jobs = await Job.find({
                postedBy: req.user._id
            }).select("_id");

            const jobIds = jobs.map((job) => job._id);

            const applications = await Application.find({
                job: { $in: jobIds }
            })
                .populate("student", "-password")
                .populate("job")
                .sort({ createdAt: -1 });

            res.json(applications);
        } catch (error) {
            console.error("Employer applications error:", error.message);

            res.status(500).json({
                message: "Server error while fetching applications."
            });
        }
    }
);

// =====================================
// UPDATE APPLICATION STATUS
// EMPLOYER ONLY
// =====================================
router.put(
    "/:id/status",
    protect,
    authorize("employer"),
    async (req, res) => {
        try {
            const { status } = req.body;

            const allowedStatuses = [
                "pending",
                "shortlisted",
                "rejected",
                "selected"
            ];

            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    message: "Invalid application status."
                });
            }

            const application = await Application.findById(req.params.id)
                .populate("job");

            if (!application) {
                return res.status(404).json({
                    message: "Application not found."
                });
            }

            if (
                application.job.postedBy.toString() !==
                req.user._id.toString()
            ) {
                return res.status(403).json({
                    message: "You can only manage applications for your jobs."
                });
            }

            application.status = status;

            await application.save();

            res.json({
                message: "Application status updated successfully.",
                application
            });
        } catch (error) {
            console.error(
                "Update application status error:",
                error.message
            );

            res.status(500).json({
                message: "Server error while updating application."
            });
        }
    }
);

module.exports = router;