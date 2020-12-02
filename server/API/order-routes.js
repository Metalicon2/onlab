const router = require("koa-router")();
const db = require("../models");
const jwt = require("jsonwebtoken");

//get userid from token so we don't send userid from the browser to the server
router.post("/order/new", async (ctx) => {
  const { id } = jwt.decode(ctx.header.authorization);
  const Order = await db.Order.create({
    user_id: id,
  }).catch((err) => console.log(err));
  let errCounter = ctx.request.body.length;
  if (Order.id) {
    ctx.request.body.map(async (orderItem) => {
      const OrderItem = await db.OrderItem.create({
        quantity: orderItem.quantity,
        food_id: orderItem.foodid,
        orderDate: orderItem.orderDate,
        order_id: Order.id,
      }).catch((err) => console.log(err));
      if (!OrderItem.id) {
        --errCounter;
      }
    });
    if (errCounter == ctx.request.body.length) {
      ctx.response.body = {
        msg: "Created new order!",
        status: 200,
      };
    } else {
      ctx.response.body = {
        msg: "Failed to create new order!",
        status: 401,
      };
    }
  } else {
    ctx.response.body = {
      msg: "Cannot make new order!",
      status: 401,
    };
  }
});

router.get("/order/all", async (ctx) => {
  const Orders = await db.Order.findAll({
    include: [db.OrderItem],
  });
  if (Orders.length) {
    ctx.response.body = Orders;
  } else {
    ctx.response.body = "no orders found!";
  }
});

router.get("/orderitem/all", async (ctx) => {
  const OrderItems = await db.OrderItem.findAll({
    include: [db.Food],
  }).catch((err) => console.log(err));
  if (OrderItems.length) {
    ctx.response.body = OrderItems;
  } else {
    ctx.response.body = "no orderitems found!";
  }
});

module.exports = router;
