const Sequelize = require("sequelize");
const connection = require("../database/connection");

module.exports = connection.define("User", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING(12),
        allowNull: false
    }
});