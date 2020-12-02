module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            unique: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password_hash: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(12),
            allowNull: false
        }
    });

    User.associate = models => {
        User.hasMany(models.Order, { 
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        });
        User.hasMany(models.Menu, { 
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        });
    }

    return User;
}