const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const db = require("./models");
const data = require("./seedData/data.json");

const PORT = process.env.PORT || 3001;

const app = new Koa();

app.use(bodyParser());

const router = require("./API");

app.use(router.routes()).use(router.allowedMethods());

db.sequelize.sync().then(() => {
  app.listen(PORT, console.log(`DB connection successful, Server is running on PORT: ${PORT}`));
})
.then(() => db.Food.bulkCreate(data.foods).catch(err => console.log(err)))
.catch(err => console.log(err));