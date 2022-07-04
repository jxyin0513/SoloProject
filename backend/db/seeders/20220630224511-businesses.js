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
      name: "Cliffside Chicken",
      phoneNumber: "204-452-1123",
      description: "This place chicken is legit, and best barbecue chicken in town",
      address: "431 Road Ave",
      city: "New York",
      state: "New York",
      coverImg: "/images/chicken.png",
      zipCode:"03194",
      createdAt: new Date(),
      updatedAt: new Date()

     },

     {
       ownerId:"1",
       name: "Ball Taco",
       phoneNumber: "201-987-2289",
       description: "This place has best combination of taco, burito, etc.",
       address: "321 Flatbush Ave",
       city: "Fort Lee",
       state: "New York",
       zipCode: "07650",
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      ownerId:"1",
      name: "Hit Pizza",
      phoneNumber: "342-134-5555",
      description: "This place is serving both quality and best serivce, with best pizza in town",
      address: "53-55 Essex St",
      city: " Hackensack",
      state: "NJ",
      zipCode: "07601",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      ownerId:"1",
      name: "King of Burger",
      phoneNumber: "453-223-4444",
      description: "This place has some kick for burgers, and chicken nuggets are magic!",
      address: "811 Palisade Ave",
      city: "Fort Lee",
      state: "NJ",
      zipCode: "07024",
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
