const router = require("koa-router")();
const db = require("../models");
const bcrypt = require("bcrypt");

router.get("/", ctx => {
    ctx.body = "Hello Home!";    
});

const users = require("./user-routes");
const orders = require("./order-routes");
const foods = require("./food-routes");

router.use(users.routes()).use(users.allowedMethods());
router.use(orders.routes()).use(orders.allowedMethods());
router.use(foods.routes()).use(foods.allowedMethods());

module.exports = router;