'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable(
          'crop',
          {
            id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true,
            },
            img_url: { type: Sequelize.STRING },
          },
          { transaction: t },
        ),
        queryInterface.createTable(
          'crop_translation',
          {
            crop_id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              unique: 'index',
              references: {
                model: 'crop',
                key: 'id',
              },
              onDelete: 'cascade',
            },
            language_code: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              unique: 'index',
              references: {
                model: 'language',
                key: 'id',
              },
              onDelete: 'cascade',
            },
            name: { type: Sequelize.STRING },
          },
          { transaction: t },
        ),
      ]);
    });
  },

  down: async (queryInterface) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable('crop_translation', { transaction: t }),
        queryInterface.dropTable('crop', { transaction: t }),
      ]);
    });
  },
};
