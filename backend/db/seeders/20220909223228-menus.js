'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      return queryInterface.bulkInsert('Menus', [
        {
          restaurantId: 1,
          name: 'Wings',
          image_url: 'https://s3-media0.fl.yelpcdn.com/bphoto/W_MOvQ-fKZm_ynhydsGcjg/348s.jpg',
          price: 11,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          restaurantId: 1,
          name: 'Cheese Fries',
          image_url: 'https://s3-media0.fl.yelpcdn.com/bphoto/EyMpiVX9kfFwTwkw3w3XEQ/348s.jpg',
          price: 8,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          restaurantId: 1,
          name: 'Bacon Cheese Fries',
          image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQul9fHmIjgOzeRN8YDMEA2ZnJHs3MUDX9rBqxwDGyIzC2d1IJXIshNioVZQk9Bemx6PZg&usqp=CAU',
          price: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          restaurantId: 1,
          name: 'Onion Rings',
          image_url: 'https://www.justataste.com/wp-content/uploads/2013/01/beer-battered-onion-rings.jpg',
          price: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          restaurantId: 1,
          name: 'Grilled BBQ Chicken',
          image_url: 'https://s3-media0.fl.yelpcdn.com/bphoto/3vnHYJHZpgDgwlHLiY9SLw/348s.jpg',
          price: 15,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          restaurantId: 1,
          name: 'Picanha',
          image_url: 'https://toast-local-nyc3-production.nyc3.cdn.digitaloceanspaces.com/restaurants/086a51e3-77e4-4d59-97c3-93746866ead3/grilled-chicken-wspinach-menuitem-59461040-444.webp',
          price: 16,
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
      return queryInterface.bulkDelete('People', null, {});
    */
      return queryInterface.bulkDelete('Menus', null, {});
  }
};
