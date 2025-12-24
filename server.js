require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
 
// const errorMiddleware = require("./middleware/error.middleware");
 
const app = express();
 app.use(cors({
  origin: "http://localhost:4200",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
// Body parser
app.use(express.json());
 
// DB
connectDB();
 
// Routes Section
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
 
// Health check
app.get("/", (req, res) => {
  res.send("API running");
});
 
// Error handler
// app.use(errorMiddleware);
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
 
 
