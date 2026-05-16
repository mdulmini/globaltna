const express    = require("express");
const router     = express.Router();
const JobRequest = require("../models/JobRequest");

// ─────────────────────────────────────────
// GET /api/jobs
// List all jobs — supports ?category= ?status= ?search=
// ─────────────────────────────────────────
router.get("/", async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.category) filter.category = req.query.category;
    if (req.query.status)   filter.status   = req.query.status;

    // Bonus: keyword search across title and description
    if (req.query.search) {
      const regex = new RegExp(req.query.search, "i");
      filter.$or  = [{ title: regex }, { description: regex }];
    }

    const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────────
// GET /api/jobs/:id
// Fetch a single job by ID
// ─────────────────────────────────────────
router.get("/:id", async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────────
// POST /api/jobs
// Create a new job request
// ─────────────────────────────────────────
router.post("/", async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      location,
      contactName,
      contactEmail,
    } = req.body;

    // Basic input validation
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!description || !description.trim()) {
      return res.status(400).json({ message: "Description is required" });
    }

    const job = await JobRequest.create({
      title,
      description,
      category,
      location,
      contactName,
      contactEmail,
    });

    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────────
// PATCH /api/jobs/:id
// Update STATUS only
// ─────────────────────────────────────────
router.patch("/:id", async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed    = ["Open", "In Progress", "Closed"];

    if (!status || !allowed.includes(status)) {
      return res.status(400).json({
        message: `Status must be one of: ${allowed.join(", ")}`,
      });
    }

    const job = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────────
// DELETE /api/jobs/:id
// Delete a job
// ─────────────────────────────────────────
router.delete("/:id", async (req, res, next) => {
  try {
    const job = await JobRequest.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;