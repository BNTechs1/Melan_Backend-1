const express = require("express");
const router = express.Router();
const authSchema = require("../../src/utils/validation/authSchema.validation")
const authController = require("../controller/auth.controller")
const {checkSchema} = require('express-validator');
const authorize = require("../middleware/auth.middleware")
router.post("/register", checkSchema(authSchema.authSchema),authController.register);
router.post("/login", authController.login);
router.get("/user-profile/:id", authorize, authController.userProfile);
// router.get("/show/:id", authController.show);
// router.put("/update/:id", authController.update);
// router.delete("/delete/:id", authController.delete);

module.exports = router;