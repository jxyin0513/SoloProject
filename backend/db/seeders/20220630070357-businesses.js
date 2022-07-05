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
      logo: "/images/chicken.png",
      zipCode:"03194",
      createdAt: new Date(),
      updatedAt: new Date()

     },

     {
       ownerId:"2",
       name: "Ball Taco",
       phoneNumber: "201-987-2289",
       description: "This place has best combination of taco, burito, etc.",
       address: "321 Flatbush Ave",
       city: "Fort Lee",
       state: "New York",
       coverImg: "/images/taco.png",
       logo: "/images/tacobell-logo.png",
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
      coverImg: "/images/pizzahut.png",
      logo: "/images/pizzahut-logo.png",
      zipCode: "07601",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      ownerId:"3",
      name: "King of Burger",
      phoneNumber: "453-223-4444",
      description: "This place has some kick for burgers, and chicken nuggets are magic!",
      address: "811 Palisade Ave",
      city: "Fort Lee",
      state: "NJ",
      coverImg: "/images/burger.png",
      logo: "/images/burger-logo.png",
      zipCode: "07024",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      ownerId:"3",
      name: "Baskin Rabin",
      phoneNumber: "453-223-4444",
      description: "This place is THE place for ice cream wherever you go.",
      address: "811 Boulive Ave",
      city: "Fortmai",
      state: "Florida",
      coverImg: "/images/br.png",
      logo: "/images/br-logo.png",
      zipCode: "32454",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      ownerId:"2",
      name: "Braum",
      phoneNumber: "234-222-1344",
      description: "This place is so chill to hang out with friends.",
      address: "811 Boulevard Ave",
      city: "Jersey City",
      state: "NJ",
      coverImg: "/images/Braum.png",
      logo: "/images/braum-logo.png",
      zipCode: "07024",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      ownerId:"1",
      name: "Chick-fill-A",
      phoneNumber: "423-445-3133",
      description: "If you haven't try chick-fill-A, what are you doing yet?",
      address: "811 Piscal Ave",
      city: "Miami",
      state: "Ohio",
      coverImg: "/images/chickfilla.png",
      logo: "/images/chickfilla-logo.png",
      zipCode: "45543",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      ownerId:"2",
      name: "Dary Queen",
      phoneNumber: "453-223-4444",
      description: "It's good for gathering with friends and family.",
      address: "6903 JFK Boulevard",
      city: "North Bergen",
      state: "NJ",
      coverImg: "/images/dq.png",
      logo: "/images/dq-logo.png",
      zipCode: "07024",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      ownerId:"1",
      name: "Long John Silver",
      phoneNumber: "444-234-1111",
      description: "Any fried fast food you pick will be the pick of you.!",
      address: "1700 N Broad Ave",
      city: "Lansdale",
      state: "NJ",
      coverImg: "/images/lj.png",
      logo: "/images/lj-logo.png",
      zipCode: "07024",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      ownerId:"2",
      name: "Pope Eyes",
      phoneNumber: "213-132-1111",
      description: "We serve fried chicken for various range of taste.",
      address: "2534 Broadway Ave",
      city: "NY",
      state: "NY",
      coverImg: "/images/pope-eyes.png",
      logo: "/images/pope-eyeslogo.png",
      zipCode: "07024",
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
   return queryInterface.bulkDelete('Businesses', null, {});
  }
};
