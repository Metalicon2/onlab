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
      Order.hasMany(models.OrderItem, {
        foreignKey: {
          name: "order_id",
          allowNull: false
        }
      });
      Order.belongsTo(models.User);
    }
    
    return Order;
}