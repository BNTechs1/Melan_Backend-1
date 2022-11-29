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

// Importing Routes
const auth = require("./src/routes/auth.routes")
const hero = require("./src/routes/hero.routes")
const service = require("./src/routes/service.routes")
const portfolio = require("./src/routes/portfolio.routes")
const partner = require("./src/routes/partner.routes")


// Add Node Features
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// Add Rate Limit
const rateLimiter = require("./src/config/rate_config");
app.use(rateLimiter);
// Serve static files
app.use("/uploads/", express.static(path.join(__dirname, "/uploads")));

//Using Routes 
app.use("/api/auth",auth)
app.use("/api/hero", hero)
app.use("/api/service", service)
app.use("/api/portfolio", portfolio)
app.use("/api/partner", partner)


// Add Middleware
app.use(errorMiddleware);

// Run Node app
module.exports = app;
