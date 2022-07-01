'use strict';
module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    ownerId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    description: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    coverImg: DataTypes.STRING
  }, {});
  Business.associate = function(models) {
    // associations can be defined here
    Business.belongsTo(models.User, {foreignKey:"ownerId"});
    Business.hasMany(models.Review, {foreignKey: "businessId"})
  };
  return Business;
};
