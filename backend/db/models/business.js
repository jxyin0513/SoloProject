'use strict';
module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    ownerId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    coverImg: DataTypes.STRING,
    logo: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    description: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.STRING
  }, {});
  Business.associate = function(models) {
    // associations can be defined here
    Business.hasMany(models.Review, {foreignKey:"businessId", onDelete:"cascade", hooks:true});
    Business.belongsTo(models.User, {foreignKey: "ownerId"})
  };
  return Business;
};
