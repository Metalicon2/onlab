const router = require("koa-router")();
const db = require("../models");
const bcrypt = require("bcrypt");

router.get("/", ctx => {
    ctx.body = "Hello Home!";    
});

router.post("/register", async (ctx) => {
    console.log(ctx.request.body.password.length);
    const res = await db.User.create({
      email: ctx.request.body.email,
      password_hash:await bcrypt.hash(ctx.request.body.password, 10),
      address: ctx.request.body.address,
      phone: ctx.request.body.phone,
    }).catch(err => console.log(err));
    if(res){
      ctx.status = 200;
      ctx.response.body = "register success";
    }else{
      ctx.status = 400;
      ctx.response.body = "register fail";
    }
});

router.post("/login", async (ctx) => {
    const res = await db.User.findOne({ where: {email: ctx.request.body.email }}).catch(err => console.log(err));
    if(res){
        const isCorrectPW = await bcrypt.compare(ctx.request.body.password, res.password_hash);
        if(isCorrectPW){
            ctx.status = 200;
            ctx.response.body = "login success";
        }else{
            ctx.status = 400;
            ctx.response.body = "login fail";
        }
    }else{
        ctx.status = 404;
        ctx.response.body = "no such user";
    }
});

module.exports = router;