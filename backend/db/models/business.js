'use strict';
module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    ownerId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    description: DataTypes.STRING,
    zipCode: DataTypes.STRING
  }, {});
  Business.associate = function(models) {
    // associations can be defined here
    Business.hasMany(models.Review, {foreign:"businessId"});
    Business.belongsTo(models.User, {foreign: "ownerId"})
  };
  return Business;
};
