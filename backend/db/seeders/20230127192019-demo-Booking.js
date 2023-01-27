'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    await queryInterface.bulkInsert(options,[
      {
        userId: 2,
        spotId: 1,
        startDate: '2023-05-04',
        endDate: '2023-08-04'
    },
    {
      userId: 3,
      spotId: 1,
      startDate: '2023-12-04',
      endDate: '2023-15-04'
    },
    {
      userId: 5,
      spotId: 2,
      startDate: '2023-05-04',
      endDate: '2023-08-04'
    },
    {
      userId: 4,
      spotId: 2,
      startDate: '2023-12-04',
      endDate: '2023-15-04'
    },
    {
      userId: 1,
      spotId: 3,
      startDate: '2023-12-04',
      endDate: '2023-15-04'
    },
    {
      userId: 2,
      spotId: 1,
      startDate: '2023-12-04',
      endDate: '2023-15-04'
    },


    ],{})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    await queryInterface.dropTable(options,null,{})
  }
};