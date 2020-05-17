module.exports = (sequelize, DataTypes) => {
    const Food = sequelize.define("Food", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        price: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        mainCategory: DataTypes.STRING(30),
        subCategory: DataTypes.STRING(30)
    });
    return Food;
}