'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */
   return queryInterface.bulkInsert('Businesses', [
    {
      ownerId: "1",
      name: "Chicken",
      phoneNumber: "204452123",
      description: "This place is not bad",
      zipCode:"03194",
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */
   return queryInterface.bulkDelete('Businesses', null, {});
  }
};
