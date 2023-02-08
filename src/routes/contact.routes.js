const express = require("express");
const router = express.Router();
const contactSchema = require("../../src/utils/validation/contactSchema.validation")
const ContactController = require("../controller/contact.controller")
const {checkSchema} = require('express-validator');
const authorize = require("../middleware/auth.middleware")
router.post("/create", checkSchema(contactSchema.contactSchema),ContactController.createContact);
router.get("/get",  authorize, checkSchema(contactSchema.contactSchema),ContactController.getContacts);
router.get("/show/:id", authorize, checkSchema(contactSchema.contactSchema),ContactController.getContact);


module.exports = router;