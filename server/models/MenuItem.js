module.exports = (sequelize, DataTypes) => {
    const MenuItem = sequelize.define("MenuItem", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        quantity: DataTypes.INTEGER(20),
    });

    MenuItem.associate = models => {
        MenuItem.belongsTo(models.Menu);
        MenuItem.belongsTo(models.Food, {
            foreignKey: {
                name: "food_id",
                allowNull: false
            }
        });
    }

    return MenuItem;
}