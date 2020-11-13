const router = require("koa-router")();

router.get("/token/ping", (ctx) => {
  return (ctx.body = {
    status: 200,
    msg: "valid token",
  });
});

module.exports = router;
