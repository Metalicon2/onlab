const bcrypt = require("bcrypt");
const router = require("koa-router")();
const db = require("../models");

router.post("/user/register", async (ctx) => {
    const { email, password, address, phone} = ctx.request.body;
    if(email.length > 1 && password.length > 1 && address.length > 1 && phone.length === 12){
        const res = await db.User.create({
            email: email,
            password_hash: await bcrypt.hash(password, 10),
            address: address,
            phone: phone,
          }).catch(err => console.log(err));
          if(res){
            ctx.response.body = {
              msg: "register success",
              status: 200
            }
          }else{
            ctx.response.body = {
                msg: "register fail",
                status: 401
              }
          }
    }else{
        ctx.response.body = {
            msg: "empty field!",
            status: 401
        }
    }
});

router.post("/user/login", async (ctx) => {
    const { email, password} = ctx.request.body;
    if(email.length > 1 && password.length > 1){
        const res = await db.User.findOne({ where: {email: ctx.request.body.email }}).catch(err => console.log(err));
        if(res){
            const isCorrectPW = await bcrypt.compare(ctx.request.body.password, res.password_hash);
            if(isCorrectPW){
                ctx.response.body = {
                    msg: "login success",
                    status: 200,
                    payload: res.id
                }
            }else{
                ctx.response.body = {
                    msg: "wrong password",
                    status: 400
                }
            }
        }else{
            ctx.response.body = {
                msg: "no such user",
                status: 401
            }
        }
    }else{
        ctx.response.body = {
            msg: "empty field!",
            status: 402
        }
    }
});

router.get("/user/all", async (ctx) => {
    const Users = await db.User.findAll({ include: [db.Order]}).catch(err => console.log(err));
    if(Users.length){
        ctx.response.body = Users;
    }else{
        ctx.response.body = "No users found!";
    }
});

module.exports = router;