const express = require("express");
const router = express.Router();
const PortfolioSchema = require("../../src/utils/validation/portfolioSchema.validation")
const PortfolioController = require("../controller/portfolio.controller")
const {checkSchema} = require('express-validator');
const authorize = require("../middleware/auth.middleware")
router.post("/create", authorize, checkSchema(PortfolioSchema.portfolioSchema),PortfolioController.createPortfolio);
router.get("/get",  checkSchema(PortfolioSchema.portfolioSchema),PortfolioController.getPortfolios);
router.get("/show/:id",  checkSchema(PortfolioSchema.portfolioSchema),PortfolioController.getPortfolio);
router.put("/update/:id", authorize, checkSchema(PortfolioSchema.portfolioSchema),PortfolioController.updatePortfolio);
router.delete("/delete/:id", authorize, checkSchema(PortfolioSchema.portfolioSchema),PortfolioController.deletePortfolio);

module.exports = router;