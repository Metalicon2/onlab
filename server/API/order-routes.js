const router = require("koa-router")();
const db = require("../models");

/*
[
    {
        foodid, 
        userid,
        quantity
    }
]

*/

router.post("/order/new", async (ctx) => {
    console.log(ctx.request.body.userid);
    const Order = await db.Order.create({
        user_id: ctx.request.body.userid  
    }).catch(err => console.log(err));
    if(Order.id){
        const OrderItem = await db.OrderItem.create({
            quantity: ctx.request.body.quantity,
            food_id: ctx.request.body.food_id,
            order_id: Order.id
        });
        ctx.response.body = "Created new order!";
    }else{
        ctx.response.body = "Cannot make new order!";
    }
});

router.get("/order/all", async (ctx) => {
    const Orders = await db.Order.findAll({
        include: [db.OrderItem]
    });
    if(Orders.length){
        ctx.response.body = await db.OrderItem.findAll();
    }else{
        ctx.response.body = "no orders found!";
    }
});

router.get("/orderitem/all", async ctx => {
    const res = await db.OrderItem.findAll().catch(err => console.log(err));
    ctx.response.body = res;
});

module.exports = router;