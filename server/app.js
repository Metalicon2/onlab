const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const db = require("./models");
const data = require("./seedData/data");
const cors = require('@koa/cors');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = new Koa();

app.use(bodyParser());

app.use(cors());

const router = require("./API");
const authentication = require("./utils/authentication");

//authentication middleware
app.use((ctx, next) => authentication(ctx, next));

app.use(router.routes()).use(router.allowedMethods());

db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, console.log(`DB connection successful, Server is running on PORT: ${PORT}`));
})
.then(() => db.Food.bulkCreate(data).catch(err => console.log(err)))
.catch(err => console.log(err));