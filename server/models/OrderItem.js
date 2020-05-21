module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define("OrderItem", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        quantity: DataTypes.INTEGER(20)
    });

    OrderItem.associate = models => {
        OrderItem.belongsTo(models.Order);
        OrderItem.belongsTo(models.Food, {
            foreignKey: {
            name: "food_id",
            allowNull: false
            }
        });
    }

    return OrderItem;
}