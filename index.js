// Import Libraries
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
// Create express app
const app = express();

// Import DB Config
const connectToDB = require("./src/config/db_config");
connectToDB();

// Import Middleware
const errorMiddleware = require("./src/middleware/error.middleware");

// Add Node Features
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// Add Rate Limit
const rateLimiter = require("./src/config/rate_config");
app.use(rateLimiter);
// Serve static files
app.use("/uploads/", express.static(path.join(__dirname, "/uploads")));

// Add Middleware
app.use(errorMiddleware);

// Run Node app
module.exports = app;
