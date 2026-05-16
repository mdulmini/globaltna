require("dotenv").config();
const mongoose   = require("mongoose");
const JobRequest = require("./models/JobRequest");

const sampleJobs = [
  {
    title: "Leaking kitchen tap",
    description: "The kitchen tap has been dripping constantly for two weeks. Needs urgent fixing.",
    category: "Plumbing",
    location: "Glasgow",
    contactName: "Alice Brown",
    contactEmail: "alice@example.com",
    status: "Open",
  },
  {
    title: "Faulty living room sockets",
    description: "Two plug sockets stopped working after a power cut last week.",
    category: "Electrical",
    location: "Edinburgh",
    contactName: "Bob Smith",
    contactEmail: "bob@example.com",
    status: "Open",
  },
  {
    title: "Garden fence repaint needed",
    description: "Wooden fence around the back garden is peeling badly and needs a full repaint.",
    category: "Painting",
    location: "Aberdeen",
    contactName: "Carol White",
    contactEmail: "carol@example.com",
    status: "In Progress",
  },
  {
    title: "Wardrobe door hinge broken",
    description: "The hinge on the master bedroom wardrobe snapped off. Door won't close properly.",
    category: "Joinery",
    location: "Dundee",
    contactName: "David Jones",
    contactEmail: "david@example.com",
    status: "Open",
  },
  {
    title: "Bathroom ceiling damp patch",
    description: "Large damp patch appearing on bathroom ceiling, likely a slow leak from upstairs.",
    category: "Plumbing",
    location: "Glasgow",
    contactName: "Emma Wilson",
    contactEmail: "emma@example.com",
    status: "Closed",
  },
  {
    title: "Kitchen rewire needed",
    description: "Old fuse board, want full kitchen rewire for safety before renovation.",
    category: "Electrical",
    location: "Stirling",
    contactName: "Frank Hall",
    contactEmail: "frank@example.com",
    status: "Open",
  },
  {
    title: "Shed door frame rotted",
    description: "The bottom of the shed door frame has rotted through and needs replacing.",
    category: "Joinery",
    location: "Perth",
    contactName: "Grace Lee",
    contactEmail: "grace@example.com",
    status: "Open",
  },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
    await JobRequest.deleteMany({});
    await JobRequest.insertMany(sampleJobs);
    console.log(`✅ Seeded ${sampleJobs.length} sample jobs`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
})();