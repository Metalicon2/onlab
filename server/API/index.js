const router = require("koa-router")();

router.get("/", ctx => {
    ctx.body = "Hello Home!";    
});

const validToken = require("./token-ping");
const users = require("./user-routes");
const orders = require("./order-routes");
const foods = require("./food-routes");

router.use(validToken.routes()).use(validToken.allowedMethods());
router.use(users.routes()).use(users.allowedMethods());
router.use(orders.routes()).use(orders.allowedMethods());
router.use(foods.routes()).use(foods.allowedMethods());

module.exports = router;