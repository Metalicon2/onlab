module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define("Menu", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  });

  Menu.associate = (models) => {
    Menu.hasMany(models.MenuItem, {
      foreignKey: {
        name: "menu_id",
        allowNull: false,
      },
    });
    Menu.belongsTo(models.User);
  };

  return Menu;
};
