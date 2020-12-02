const router = require("koa-router")();
const db = require("../models");
const jwt = require("jsonwebtoken");

//get userid from token so we don't send userid from the browser to the server
router.post("/menu/new", async (ctx) => {
  const { id } = jwt.decode(ctx.header.authorization);
  const Menu = await db.Menu.create({
    user_id: id,
    name: ctx.request.body[0].name,
  }).catch((err) => console.log(err));
  let errCounter = ctx.request.body.length;
  if (Menu.id) {
    ctx.request.body.map(async (menuItem) => {
      const MenuItem = await db.MenuItem.create({
        quantity: menuItem.quantity,
        food_id: menuItem.foodid,
        menu_id: Menu.id,
      }).catch((err) => console.log(err));
      if (!MenuItem.id) {
        --errCounter;
      }
    });
    if (errCounter == ctx.request.body.length) {
      ctx.response.body = {
        msg: "Created new menu!",
        status: 200,
      };
    } else {
      ctx.response.body = {
        msg: "Failed to create new menu!",
        status: 401,
      };
    }
  } else {
    ctx.response.body = {
      msg: "Cannot make new menu!",
      status: 401,
    };
  }
});

router.get("/menu/:userid", async (ctx) => {
  const Menus = await db.Menu.findAll({
    include: [
      {
        model: db.MenuItem,
        include: [db.Food],
      },
    ],
    where: { user_id: ctx.params.userid },
  });
  if (Menus[0].id) {
    ctx.response.body = {
      data: Menus,
      status: 200,
    };
  } else {
    ctx.response.body = {
      msg: "Failed to get menus!",
      status: 401,
    };
  }
});

module.exports = router;
