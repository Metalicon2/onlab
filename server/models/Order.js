module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            unique: true,
          },
    });

    Order.associate = models => {
      Order.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
    }

    return Order;
}