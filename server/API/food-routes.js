const db = require("../models");
const router = require("koa-router")();

router.post("/food/new", async ctx => {
    const res = await db.Food.create({
        name: ctx.request.body.name,
        price: ctx.request.body.price,
        description: ctx.request.body.description,
        mainCategory: ctx.request.body.mainCategory,
        subCategory: ctx.request.body.subCategory
    }).catch(err => console.log(err));
    if (res.name) {
        ctx.response.body = "Added new food!";
    } else {
        ctx.response.body = "Cannot add new food!";
    }
});

router.get("/food/item/:id", async ctx => {
    const Food = await db.Food.findOne({
        where: { id: ctx.params.id }
    }).catch(err => console.log(err));
    if (Food) {
        ctx.response.body = Food;
    } else {
        ctx.response.body = "No food found!";
    }
});

router.get("/food/main/:maincategory", async ctx => {
    const FoodList = await db.Food.findAll({
        where: {
            mainCategory: ctx.params.maincategory
        }
    }).catch(err => console.log(err));
    if (FoodList.length) {
        ctx.response.body = FoodList;
    } else {
        ctx.response.body = "No foods found!";
    }
});

router.get("/food/sub/:subcategory", async ctx => {
    const FoodList = await db.Food.findAll({
        where: {
            subCategory: ctx.params.subcategory
        }
    }).catch(err => console.log(err));
    if (FoodList.length) {
        ctx.response.body = FoodList;
    } else {
        ctx.response.body = "No foods found!";
    }
});

router.get("/food/all", async ctx => {
    const res = await db.Food.findAll().catch(err => console.log(err));
    if (res.length) {
        ctx.response.body = res;
    } else {
        ctx.response.body = "No foods available!";
    }
});

module.exports = router;