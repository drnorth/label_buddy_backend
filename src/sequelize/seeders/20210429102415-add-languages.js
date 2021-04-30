'use strict';

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('language', [
      {
        name: 'en_EU_seed',
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('language', { name: 'en_EU_seed' }, {});
  },
};
