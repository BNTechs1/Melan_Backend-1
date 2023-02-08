const asyncHandler = require("express-async-handler");
const ContactModel = require("../models/contactus.model");
const {body,validationResult} = require('express-validator');
const { v4: uuidv4} = require("uuid")
const createContact = asyncHandler(async(req,res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { name, email, phoneNumber, message } = req.body;
    const contactId = uuidv4();
    const contact = await new ContactModel({
            contactId,
            name,
            email,
            phoneNumber,
            message 
        }).save();
    res.status(200).json({
        success: true,
        message: 'Message Sent successful',
        json: contact
    });
   
});


const getContacts = asyncHandler(async(req,res)=>{
    const contact = await ContactModel.find();
    const resut =  {
        data: contact
    }
    res.status(200).send(resut)
});

const getContact= asyncHandler(async(req,res)=>{
    const contact = await ContactModel.findOne({contactId:req.params.id});
    const resut =  {
        data: contact
    }
    res.status(200).send(resut)
});



module.exports = {
    getContact,
    getContacts,
    createContact,
}