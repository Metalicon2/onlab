module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define("OrderItem", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        food_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: DataTypes.INTEGER(20)
    });
    return OrderItem;
}