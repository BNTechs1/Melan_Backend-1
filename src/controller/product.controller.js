
const asyncHandler = require("express-async-handler");
const GeneratorModel = require("../models/generator.model");
const PumpModel = require("../models/pump.model");
const SparePartModel = require("../models/sparePart.model");
const GensetModel = require("../models/genset.model");
const AtsModel = require("../models/ats.model");
const orderModel = require("../models/order.model");
const heroModel = require("../models/hero.model")
const aboutModel = require("../models/about.model")
const serviceModel = require("../models/service.model")
const projectModel = require("../models/portfolio.model")
const overView = asyncHandler(async(req,res)=>{
    let products = [];
    let generatorQuantity;
    let pumpQuantity
    let atsQuantity
    let sparePartQuantity
    let gensetQuantity
    let newOrder
    let active
    let upcoming
    let totalApproved
    let rejected
    let hero 
    let about 
    let service
    let project

    const heros = await heroModel.find().then((result)=>{
        hero = result.length
    });
    const abouts = await aboutModel.find().then((result)=>{
        about = result.length
    });
    const services = await serviceModel.find().then((result)=>{
        service = result.length
    });
    const projects = await projectModel.find().then((result)=>{
        project = result.length
    });
    const generator = await GeneratorModel.find().then((result)=>{
        generatorQuantity = result.length
    });
    const pump = await PumpModel.find().then((result)=>{
        pumpQuantity = result.length
    });
    const sparePart = await SparePartModel.find().then((result)=>{
       sparePartQuantity = result.length
    });;
    const genset = await GensetModel.find().then((result)=>{
       gensetQuantity = result.length
    });;
    const ats = await AtsModel.find().then((result)=>{
       atsQuantity = result.length
    });;  
    const activeOrders =  await orderModel.find().then((order)=>{ 
        let result = [];
       order.map((booked)=>{
            const currentDate = new Date(Date.now())
            const bookedEndDate = new Date(booked.endDate)
            if(bookedEndDate.getTime() > currentDate.getTime()){
                result.push(booked);
                
            }
        });
        active = result.length
        console.log(active)
    }); 

    const rejectedOrders = await orderModel.find().then((order)=>{
         let result = [];
       order.map((booked)=>{
        if(booked.status = "rejected"){
            result.push(booked)
        }
        
     })
        rejected = result.length
    });
       
    const scheduledOrders =  await orderModel.find().then((order=> {
        let result = [];
        order.map((booked)=>{
            const currentDate = new Date(Date.now())
            const bookedStartDate = new Date(booked.startDate)
            if(bookedStartDate.getTime() > currentDate.getTime()){
                result.push(booked)
            }
            
        })
        upcoming = result.length
       
    }));


    const approvedPast =  await orderModel.find().then((order)=>{
        let result = []
       order.map((booked)=>{
        const currentDate = new Date(Date.now())
        const bookedEndDate = new Date(booked.endDate)
        if( bookedEndDate.getTime() < currentDate.getTime() && booked.status == "Approved"){
            result.push(booked)
        }
        
     })
        totalApproved = result.length
    });
        
     const pendingOrders = await orderModel.find().then((order)=>{
            let result = [];
            result.map((order) =>{
                if(order.status = "Pending"){
                    pending.push(order)
                } else {
                    return "No Pending Orders"
                }
            })
   
        newOrder = result.length
    });


        
   
    const result =  {
        product:{
            generator: generatorQuantity,
            pump: pumpQuantity, 
            genset: gensetQuantity, 
            sparePart: sparePartQuantity, 
            ats: atsQuantity
        },
        rent:{
            newOrder: newOrder,
            active: active,
            upcoming: upcoming,
            totalApproved: totalApproved,
            rejected : rejected
        },
        content : {
            hero: hero,
            about:about, 
            service: service,
            project: project,


        }

    }
    res.status(200).send(result)

});
const getProducts = asyncHandler(async(req,res)=>{
    let products = [];
    const generator = await GeneratorModel.find().then((result)=>{
        result.map((product)=>{
            products.push(product);
        })
    });
    const pump = await PumpModel.find().then((result)=>{
        result.map((product)=>{
            products.push(product);
        })
    });
    const sparePart = await SparePartModel.find().then((result)=>{
        result.map((product)=>{
            products.push(product);
        })
    });;
    const genset = await GensetModel.find().then((result)=>{
        result.map((product)=>{
            products.push(product);
        })
    });;
    const ats = await AtsModel.find().then((result)=>{
        result.map((product)=>{
            products.push(product);
        })
    });;

    const resut =  { 
        data: products 
    }
    // console.log(resut)
    res.status(200).send(resut)
});

module.exports = {
    getProducts,
    overView
}




    
    
    
     
   