module.exports = (sequelize, DataTypes) => {
    const Food = sequelize.define("Food", {
        price: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        mainCategory: DataTypes.STRING(30),
        subCategory: DataTypes.STRING(30),
        description: {
            type: DataTypes.STRING(100)
        },
        color: {
            type: DataTypes.STRING(10)
        },
        vegetarian: {
            type: DataTypes.BOOLEAN
        },
        spicy: {
            type: DataTypes.BOOLEAN
        },
        src: {
            type: DataTypes.JSON
        },
        availableDate: {
            type: DataTypes.STRING(20)
        }
    });

    Food.associate = models => {
        Food.hasOne(models.OrderItem);
    }

    return Food;
}