'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: DataTypes.INTEGER,
    businessId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    comments: DataTypes.STRING
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User, {foreign: "userId"})
    Review.belongsTo(models.Business, {foreign: "businessId"})
  };
  return Review;
};
