module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            unique: true,
          },
          user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
    });
    return Order;
}