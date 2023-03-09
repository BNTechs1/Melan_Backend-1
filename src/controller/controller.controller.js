const asyncHandler = require("express-async-handler");
const ControllerModel = require("../models/controller.model");
const getControllers = asyncHandler(async(req,res)=>{
    let query = req.query
     if(Object.keys(query).length == 0){
         const controller = await ControllerModel.find();
         const resut =  {
             data: controller.reverse()
         }
         res.status(200).send(resut)
 
     
     }  else {
         const filter = req.query;
         const controller =  await ControllerModel.find(filter);
         const resut =  {
             data: controller.reverse()
         }
         res.status(200).send(resut)
     }    
});

const getController = asyncHandler(async(req,res)=>{
    const controller = await ControllerModel.findOne({productId:req.params.id});
    const resut =  {
        data: controller
    }
    res.status(200).send(resut)
});

const deleteController = asyncHandler(async(req,res)=>{
      await ControllerModel.deleteOne({productId:req.params.id});
      res.status(200).send(`Deleted Successfully`);
})

module.exports = {
    getController,
    getControllers,
    deleteController, 
}