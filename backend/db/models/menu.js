'use strict';
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    restaurantId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    image_url: DataTypes.STRING
  }, {});
  Menu.associate = function(models) {
    // associations can be defined here
    Menu.belongsTo(models.Business, {foreignKey:"restaurantId"})
  };
  return Menu;
};
