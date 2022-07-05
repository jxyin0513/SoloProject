'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */
   return queryInterface.bulkInsert('Reviews', [

    {
      userId: "1",
      businessId: "1",
      rating: "4",
      comment: "This place was nice.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: "1",
      businessId: "2",
      rating: "4",
      comment: "This is lit.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: "1",
      businessId: "4",
      rating: "4",
      comment: "This place is so much better than expected.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: "3",
      businessId: "1",
      rating: "4",
      comment: "You will not regret it.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: "1",
      businessId: "3",
      rating: "4",
      comment: "This place has best in town.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: "2",
      businessId: "7",
      rating: "4",
      comment: "This place has something lit.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: "3",
      businessId: "6",
      rating: "4",
      comment: "This place is so much legit.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: "3",
      businessId: "2",
      rating: "4",
      comment: "I got this place in my mind.",
      createdAt: new Date(),
      updatedAt: new Date()
    },

   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */
   return queryInterface.bulkDelete('Reviews', null, {});
  }
};
