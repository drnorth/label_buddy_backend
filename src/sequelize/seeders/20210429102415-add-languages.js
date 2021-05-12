'use strict';

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('language', [
      {
        code: 'en',
        title: 'english',
      },
      {
        code: 'te',
        title: 'telugu',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'language',
      { code: { [Sequelize.Op.or]: ['en', 'te'] } },
      {},
    );
  },
};
