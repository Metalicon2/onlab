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
    if(res.name){
        ctx.response.body = "Added new food!";
    }else{
        ctx.response.body = "Cannot add new food!";
    }
});

router.get("/food/all", async ctx => {
    const res = await db.Food.findAll().catch(err => console.log(err));
    if(res.length){
        ctx.response.body = res;
    }else{
        ctx.response.body = "No foods available!";
    } 
});

module.exports = router;