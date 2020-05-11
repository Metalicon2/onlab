const Sequelize = require("sequelize");
const connection = require("../database/connection");

module.exports = connection.define("Food", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    price: {
        type: Sequelize.INTEGER(10),
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    mainCategory: Sequelize.STRING(30),
    subCategory: Sequelize.STRING(30)
});