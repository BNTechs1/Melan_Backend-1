const asyncHandler = require("express-async-handler");
const PartnerModel = require("../models/partner.model");
const getPartners = asyncHandler(async(req,res)=>{
    const partner = await PartnerModel.find();
    const resut =  {
        data: partner.reverse()
    }
    res.status(200).send(resut)
});

const getPartner = asyncHandler(async(req,res)=>{
    const partner = await PartnerModel.find({partnerId:req.params.id});
    const resut =  {
        data: partner
    }
    res.status(200).send(resut)
});

const deletePartner = asyncHandler(async(req,res)=>{
      await PartnerModel.deleteOne({partnerId:req.params.id});
      res.status(200).send(`Deleted Succesfully`);
})

module.exports = {
    getPartner,
    getPartners,
    deletePartner, 
}