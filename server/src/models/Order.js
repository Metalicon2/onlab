const Sequelize = require("sequelize");
const connection = require("../database/connection");

module.exports = connection.define("Order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
