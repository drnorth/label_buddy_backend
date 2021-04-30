'use strict';

const crops = [
  'chilli',
  'apple',
  'brihjal',
  'cereals',
  'cotton',
  'cucumber',
  'grapes',
  'okra',
  'pomegranate',
  'potato',
  'rice',
  'soybean',
  'tomato',
  'tea',
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'crop',
      crops.map((el) => {
        return { img_url: el + '_seed' };
      }),
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      'crop',
      {
        img_url: { [Sequelize.Op.endsWith]: '_seed' },
      },
      {},
    );
  },
};
