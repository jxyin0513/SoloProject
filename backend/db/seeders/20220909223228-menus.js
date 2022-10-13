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
        },
        {
          restaurantId:2,
          name: 'Combo',
          image_url: 'https://www.tacobell.com/images/23876_classic_combo_750x660.jpg',
          price: 12,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          restaurantId:2,
          name: 'Tacos combo',
          image_url: 'https://www.tacobell.com/images/23865_chipotle_cheddar_chalupa_combo_750x660.jpg',
          price: 9,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          restaurantId:4,
          name:'Double Burger Combo',
          image_url: 'https://cdn.sanity.io/images/czqk28jt/prod_bk/f4dc27eb7337f7cbd12d3ccd840e6a031fcba622-360x270.jpg',
          price: 12,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          restaurantId: 5,
          name: 'Mint Chip Choco',
          image_url: 'https://www.baskinrobbinsathome.com/img/2022/mobile-freezer-aisle-favorites@2x.png',
          price: 8,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          restaurantId: 7,
          name: 'Chicken combo',
          image_url: 'https://media.bizj.us/view/img/11579232/chick-fil-a-6-jv*1024xx4163-2342-0-169.jpg',
          price: 18,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          restaurantId: 7,
          name: 'Chicken Waffle',
          image_url: 'http://d1fd34dzzl09j.cloudfront.net/Images/CFACOM/Stories%20Images/2019/12/most%20ordered/nuggetsmealheader.jpg',
          price: 19,
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
