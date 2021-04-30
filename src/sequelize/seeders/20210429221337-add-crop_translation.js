'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const languages = await queryInterface.sequelize.query(
      `SELECT * FROM "language" WHERE "name"='en_EU_seed' LIMIT 1`,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      },
    );
    const crops = await queryInterface.sequelize.query(
      `SELECT * FROM "crop" WHERE "img_url" LIKE '%_seed'`,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      },
    );
    return queryInterface.bulkInsert(
      'crop_translation',
      crops.map((el) => {
        return {
          crop_id: el.id,
          language_code: languages[0].id,
          name: el.img_url,
        };
      }),
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'crop_translation',
      {
        name: { [Sequelize.Op.endsWith]: '_seed' },
      },
      {},
    );
  },
};
