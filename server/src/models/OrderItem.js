const Sequelize = require("sequelize");
const connection = require("../database/connection");

module.exports = connection.define("OrderItem", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    order_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    food_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity: Sequelize.INTEGER(20)
});