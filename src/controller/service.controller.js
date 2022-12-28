const asyncHandler = require("express-async-handler");
const ServiceModel = require("../models/service.model");
const {body,validationResult} = require('express-validator');
const { v4: uuidv4} = require("uuid")
const createService = asyncHandler(async(req,res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { title, longDesc, shortDesc } = req.body;
    const serviceId = uuidv4();
    const service = await new ServiceModel({
            serviceId,
            shortDesc,
            title,
            longDesc, 
        }).save();
    res.status(200).json({
        success: true,
        message: 'Service created successful',
        json: service
    });
   
});

const updateService = asyncHandler(async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { title, longDesc, shortDesc } = req.body;
    let service = await ServiceModel.findOne({serviceId:req.params.id})
    service.updateOne({
        $set:{
            shortDesc: shortDesc,
            title:title,
            longDesc:longDesc, 
        }
           
        }, {new:true})

    res.status(200).json({
        success: true,
        message: 'Service Updated successful',
        json: service
    });
})
const getServices = asyncHandler(async(req,res)=>{
    const service = await ServiceModel.find();
    const resut =  {
        data: service
    }
    res.status(200).send(resut)
});

const getService = asyncHandler(async(req,res)=>{
    const service = await ServiceModel.find({serviceId:req.params.id});
    const resut =  {
        data: service
    }
    res.status(200).send(resut)
});

const deleteService = asyncHandler(async(req,res)=>{
      await ServiceModel.deleteOne({serviceId:req.params.id});
      res.status(200).send(`Deleted Successfully`);
})

module.exports = {
    getService,
    getServices,
    createService,
    updateService,
    deleteService 
}