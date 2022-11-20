const asyncHandler = require("express-async-handler");
const HeroModel = require("../models/hero.model");
const getHeros = asyncHandler(async(req,res)=>{
    const hero = await HeroModel.find();
    const resut =  {
        data: hero
    }
    res.status(200).send(resut)
});

const getHero = asyncHandler(async(req,res)=>{
    const hero = await HeroModel.find({userId:req.params.id});
    const resut =  {
        data: hero
    }
    res.status(200).send(resut)
});

const deleteHero = asyncHandler(async(req,res)=>{
    const currentHero= await HeroModel.find({userId:req.params.id});
      await HeroModel.deleteOne({userId:req.params.id});
      res.send(`Hero ${currentHero[0].userId} removed`);
})

module.exports = {
    getHero,
    getHeros,
    deleteHero, 
}