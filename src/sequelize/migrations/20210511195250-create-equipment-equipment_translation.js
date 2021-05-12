'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable(
          'equipment',
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
          'equipment_translation',
          {
            equipment_id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              unique: 'index',
              references: {
                model: 'equipment',
                key: 'id',
              },
              onDelete: 'cascade',
            },
            language_code: {
              type: Sequelize.STRING,
              primaryKey: true,
              unique: 'index',
              references: {
                model: 'language',
                key: 'code',
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

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable('equipment_translation', { transaction: t }),
        queryInterface.dropTable('equipment', { transaction: t }),
      ]);
    });
  },
};
