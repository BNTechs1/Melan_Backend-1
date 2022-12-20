const express = require("express");
const router = express.Router();
const authSchema = require("../../src/utils/validation/authSchema.validation")
const authController = require("../controller/auth.controller")
const {checkSchema} = require('express-validator');
const authorize = require("../middleware/auth.middleware")
router.post("/register", checkSchema(authSchema.authSchema),authController.register);
router.post("/login", authController.login);
router.post("/checkauth", authorize, authController.authcheck);
router.get("/user-profile/:id", authorize, authController.userProfile);


module.exports = router;