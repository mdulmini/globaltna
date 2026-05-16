const request  = require("supertest");
const mongoose = require("mongoose");
const app      = require("../server");

const TEST_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/globaltna_test";

beforeAll(async () => {
  await mongoose.connect(TEST_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

// ── POST /api/jobs ──────────────────────────────────────
describe("POST /api/jobs", () => {
  it("201 — creates a job with valid data", async () => {
    const res = await request(app).post("/api/jobs").send({
      title: "Fix leaking roof",
      description: "Water coming through the ceiling in bedroom.",
      category: "Plumbing",
      location: "Glasgow",
      contactName: "Test User",
      contactEmail: "test@example.com",
    });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Fix leaking roof");
    expect(res.body.status).toBe("Open");
  });

  it("400 — missing title returns error", async () => {
    const res = await request(app).post("/api/jobs").send({
      description: "No title provided here",
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBeTruthy();
  });

  it("400 — missing description returns error", async () => {
    const res = await request(app).post("/api/jobs").send({
      title: "No description here",
    });
    expect(res.status).toBe(400);
  });
});

// ── GET /api/jobs ───────────────────────────────────────
describe("GET /api/jobs", () => {
  it("200 — returns an array", async () => {
    const res = await request(app).get("/api/jobs");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("200 — filters by category", async () => {
    const res = await request(app).get("/api/jobs?category=Plumbing");
    expect(res.status).toBe(200);
    res.body.forEach((job) => expect(job.category).toBe("Plumbing"));
  });

  it("200 — filters by status", async () => {
    const res = await request(app).get("/api/jobs?status=Open");
    expect(res.status).toBe(200);
    res.body.forEach((job) => expect(job.status).toBe("Open"));
  });
});

// ── PATCH /api/jobs/:id ─────────────────────────────────
describe("PATCH /api/jobs/:id", () => {
  it("400 — invalid status returns error", async () => {
    // Create a job first
    const created = await request(app).post("/api/jobs").send({
      title: "Patch test job",
      description: "Testing patch endpoint",
    });
    const id  = created.body._id;
    const res = await request(app)
      .patch(`/api/jobs/${id}`)
      .send({ status: "InvalidStatus" });
    expect(res.status).toBe(400);
  });

  it("200 — valid status update works", async () => {
    const created = await request(app).post("/api/jobs").send({
      title: "Another patch job",
      description: "Status update test",
    });
    const id  = created.body._id;
    const res = await request(app)
      .patch(`/api/jobs/${id}`)
      .send({ status: "In Progress" });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("In Progress");
  });
});