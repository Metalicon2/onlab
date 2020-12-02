const router = require("koa-router")();

const validToken = require("./token-ping");
const users = require("./user-routes");
const orders = require("./order-routes");
const foods = require("./food-routes");
const menus = require("./menu-routes");

router.use(validToken.routes()).use(validToken.allowedMethods());
router.use(users.routes()).use(users.allowedMethods());
router.use(orders.routes()).use(orders.allowedMethods());
router.use(foods.routes()).use(foods.allowedMethods());
router.use(menus.routes()).use(menus.allowedMethods());

module.exports = router;