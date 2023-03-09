
const asyncHandler = require("express-async-handler");
const GeneratorModel = require("../models/generator.model");
const PumpModel = require("../models/pump.model");
const SparePartModel = require("../models/sparePart.model");
const ControllerModel = require("../models/controller.model");
const AtsModel = require("../models/ats.model");
const orderModel = require("../models/order.model");
const heroModel = require("../models/hero.model")
const aboutModel = require("../models/about.model")
const serviceModel = require("../models/service.model")
const projectModel = require("../models/portfolio.model");
const { clearConfigCache } = require("prettier");
const overView = asyncHandler(async (req, res) => {
    let products = [];
    let generatorQuantity;
    let pumpQuantity
    let atsQuantity
    let sparePartQuantity
    let controllerQuantity
    let newOrder
    let active
    let upcoming
    let totalApproved
    let rejected
    let hero
    let about
    let service
    let project

    const heros = await heroModel.find().then((result) => {
        hero = result.length
    });
    const abouts = await aboutModel.find().then((result) => {
        about = result.length
    });
    const services = await serviceModel.find().then((result) => {
        service = result.length
    });
    const projects = await projectModel.find().then((result) => {
        project = result.length
    });
    const generator = await GeneratorModel.find().then((result) => {
        generatorQuantity = result.length
    });
    const pump = await PumpModel.find().then((result) => {
        pumpQuantity = result.length
    });
    const sparePart = await SparePartModel.find().then((result) => {
        sparePartQuantity = result.length
    });;
    const controller = await ControllerModel.find().then((result) => {
        controllerQuantity = result.length
    });;
    const ats = await AtsModel.find().then((result) => {
        atsQuantity = result.length
    });;
    const activeOrders = await orderModel.find().then((order) => {
        let result = [];
        order.map((booked) => {
            const currentDate = new Date(Date.now())
            const bookedEndDate = new Date(booked.endDate)
            const bookedStartDate = new Date(booked.startDate)

            if (bookedStartDate.getTime() < currentDate.getTime() && bookedEndDate.getTime() > currentDate.getTime() && booked.status === "Approved") {
                result.push(booked);

            }
        });
        active = result.length
    });

    const rejectedOrders = await orderModel.find().then((order) => {
        let result = [];
        order.map((booked) => {
            if (booked.status === "Rejected") {
                result.push(booked)
            }

        })
        rejected = result.length
    });

    const scheduledOrders = await orderModel.find().then((order => {
        let result = [];
        order.map((booked) => {
            const currentDate = new Date(Date.now())
            const bookedStartDate = new Date(booked.startDate)
            if (bookedStartDate.getTime() > currentDate.getTime()) {
                result.push(booked)
            }

        })
        upcoming = result.length

    }));


    const approvedPast = await orderModel.find().then((order) => {
        let result = []
        order.map((booked) => {
            const currentDate = new Date(Date.now())
            const bookedEndDate = new Date(booked.endDate)
            if (bookedEndDate.getTime() < currentDate.getTime() && booked.status == "Approved") {
                result.push(booked)
            }

        })
        completedOrders = result.length
    });

    const pendingOrders = await orderModel.find().then((order) => {
        let result = [];
        result.map((order) => {
            if (order.status = "Pending") {
                pending.push(order)
            } else {
                return "No Pending Orders"
            }
        })

        newOrder = result.length
    });




    const result = {
        product: {
            generator: generatorQuantity,
            pump: pumpQuantity,
            controller: controllerQuantity,
            sparePart: sparePartQuantity,
            ats: atsQuantity
        },
        rent: {
            newOrder: newOrder,
            active: active,
            upcoming: upcoming,
            completedOrders: completedOrders,
            rejected: rejected
        },
        content: {
            hero: hero,
            about: about,
            service: service,
            project: project,


        }

    }
    res.status(200).send(result)

});
const getProducts = asyncHandler(async (req, res) => {
    let products = [];
    const generator = await GeneratorModel.find().then((result) => {
        result.map((product) => {
            products.push(product);
        })
    });
    const pump = await PumpModel.find().then((result) => {
        result.map((product) => {
            products.push(product);
        })
    });
    const sparePart = await SparePartModel.find().then((result) => {
        result.map((product) => {
            products.push(product);
        })
    });;
    const controller = await ControllerModel.find().then((result) => {
        result.map((product) => {
            products.push(product);
        })
    });;
    const ats = await AtsModel.find().then((result) => {
        result.map((product) => {
            products.push(product);
        })
    });;

    const resut = {
        data: products.reverse()
    }
    // console.log(resut)
    res.status(200).send(resut)
});

const searchProducts = asyncHandler(async (req, res) => {
    let key = req.body.search.toLowerCase()
    let products = [];
    const generator = await GeneratorModel.find({ "searchKeyWord": { $regex: key } }).then((result) => {
        result.map((product) => {
            product.from = "generator"
            products.push(product);
        })
    });
    const pump = await PumpModel.find({ "searchKeyWord": { $regex: key } }).then((result) => {
        result.map((product) => {
            product.from = "pump"
            products.push(product);
        })
    });
    const sparePart = await SparePartModel.find({ "searchKeyWord": { $regex: key } }).then((result) => {
        result.map((product) => {
            product.from = "sparepart"
            products.push(product);
        })
    });;
    const controller = await ControllerModel.find({ "searchKeyWord": { $regex: key } }).then((result) => {
        result.map((product) => {
            product.from = "controller"
            products.push(product);
        })
    });;
    const ats = await AtsModel.find({ "searchKeyWord": { $regex: key } }).then((result) => {
        result.map((product) => {
            product.from = "ats"
            products.push(product);
        })
    });;

    const resut = {
        data: products.reverse()
    }
    // console.log(resut)
    res.status(200).send(resut)
});


const filter = asyncHandler(async (req, res) => {

    const { route }= req.params    
    let data;
    if( route === "ats") data = await AtsModel.find();
    else if(route === "generator") data = await GeneratorModel.find();
    else if(route === "pump") data = await PumpModel.find();
    else if (route === "controller") data = await ControllerModel.find();
    else return res.send("Not available").status(404)

    let filterField = {
        ats: ['amp'],
        generator: ['generatorType', 'generatorBrand', 'capacity', 'engineBrand'],
        pump: ['pumpType', 'pumpBrand'],
        controller: ['controllerBrand'], 
      }

    let key = {}
    filterField[route].map((i) => {
        key[i] = []
    })

    // preparing the filter values 
    data.map((p) => {
        Object.keys(key).map((i) => {
            if (!key[i].includes(p[i])) {
                key[i].push(p[i])
            }
        })
    })

    return res.send(key).status(200);
})
module.exports = {
    getProducts,
    overView,
    searchProducts, 
    filter
}








