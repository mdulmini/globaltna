const errorHandler = (err, req, res, next) => {
    console.error("ERROR:", err.message);
  
    // Mongoose validation errors (e.g. required field missing)
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
  
    // Bad MongoDB ObjectId (e.g. /api/jobs/not-a-real-id)
    if (err.name === "CastError") {
      return res.status(404).json({ message: "Resource not found" });
    }
  
    // Default
    res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
    });
  };
  
  module.exports = errorHandler;