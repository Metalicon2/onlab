const Koa = require("koa");
const koaRouter = require("koa-router");
const bodyParser = require("koa-bodyparser");
const bcrypt = require("bcrypt");

const app = new Koa();
const router = new koaRouter();

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

router.get("/", async (ctx) => {
  ctx.body = "Hello Foodster!";
});

router.post("/register", async (ctx) => {
  const User = require("./src/models/User");
  const res = await User.create({
    email: ctx.request.body.email,
    password_hash: await bcrypt.hash(ctx.request.body.password, 10),
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
    const User = require("./src/models/User");
    const res = await User.findOne({ where: {email: ctx.request.body.email }}).catch(err => console.log(err));
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

app.listen(3001, () => console.log("Server started..."));
