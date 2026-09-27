const express = require("express");

const Job = require("../models/Job");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// =====================================
// GET ALL ACTIVE JOBS
// =====================================
router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find({ status: "active" })
            .populate("postedBy", "name email")
            .sort({ createdAt: -1 });

        res.json(jobs);
    } catch (error) {
        console.error("Get jobs error:", error.message);

        res.status(500).json({
            message: "Server error while fetching jobs."
        });
    }
});

// =====================================
// GET SINGLE JOB
// =====================================
router.get("/:id", async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate("postedBy", "name email");

        if (!job) {
            return res.status(404).json({
                message: "Job not found."
            });
        }

        res.json(job);
    } catch (error) {
        console.error("Get job error:", error.message);

        res.status(500).json({
            message: "Server error while fetching job."
        });
    }
});

// =====================================
// CREATE JOB
// EMPLOYER ONLY
// =====================================
router.post(
    "/",
    protect,
    authorize("employer"),
    async (req, res) => {
        try {
            const {
                title,
                company,
                description,
                trade,
                location,
                stipend,
                duration,
                vacancies,
                skills
            } = req.body;

            if (
                !title ||
                !company ||
                !description ||
                !trade ||
                !location ||
                stipend === undefined ||
                !duration ||
                vacancies === undefined
            ) {
                return res.status(400).json({
                    message: "Please provide all required job details."
                });
            }

            const job = await Job.create({
                title,
                company,
                description,
                trade,
                location,
                stipend,
                duration,
                vacancies,
                skills: skills || [],
                postedBy: req.user._id
            });

            res.status(201).json({
                message: "Apprenticeship posted successfully.",
                job
            });
        } catch (error) {
            console.error("Create job error:", error.message);

            res.status(500).json({
                message: "Server error while creating job."
            });
        }
    }
);

// =====================================
// UPDATE JOB
// EMPLOYER ONLY
// =====================================
router.put(
    "/:id",
    protect,
    authorize("employer"),
    async (req, res) => {
        try {
            const job = await Job.findById(req.params.id);

            if (!job) {
                return res.status(404).json({
                    message: "Job not found."
                });
            }

            if (job.postedBy.toString() !== req.user._id.toString()) {
                return res.status(403).json({
                    message: "You can only update your own jobs."
                });
            }

            const updatedJob = await Job.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

            res.json({
                message: "Job updated successfully.",
                job: updatedJob
            });
        } catch (error) {
            console.error("Update job error:", error.message);

            res.status(500).json({
                message: "Server error while updating job."
            });
        }
    }
);

// =====================================
// DELETE JOB
// EMPLOYER ONLY
// =====================================
router.delete(
    "/:id",
    protect,
    authorize("employer"),
    async (req, res) => {
        try {
            const job = await Job.findById(req.params.id);

            if (!job) {
                return res.status(404).json({
                    message: "Job not found."
                });
            }

            if (job.postedBy.toString() !== req.user._id.toString()) {
                return res.status(403).json({
                    message: "You can only delete your own jobs."
                });
            }

            await Job.findByIdAndDelete(req.params.id);

            res.json({
                message: "Job deleted successfully."
            });
        } catch (error) {
            console.error("Delete job error:", error.message);

            res.status(500).json({
                message: "Server error while deleting job."
            });
        }
    }
);

module.exports = router;