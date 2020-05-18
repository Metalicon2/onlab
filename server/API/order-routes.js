const bcrypt = require("bcrypt");
const router = require("koa-router")();
const db = require("../models");

router.post("/order/new", async (ctx) => {
    
});

router.get("/order/all", async (ctx) => {
    const Orders = await db.Order.findAll();
    if(Orders.length){
        ctx.response.body = Orders;
    }else{
        ctx.response.body = "no orders found!";
    }
});

module.exports = router;