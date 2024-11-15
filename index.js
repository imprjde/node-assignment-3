require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const connectDB = require("./db/dbConnection.js");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// MongoDB connection
connectDB();

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
