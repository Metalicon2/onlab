'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("OrderItems", {
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
    quantity: Sequelize.INTEGER(20),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("OrderItems");
  }
};
