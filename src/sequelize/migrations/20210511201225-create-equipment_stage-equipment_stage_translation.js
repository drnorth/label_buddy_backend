'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable(
          'equipment_stage',
          {
            id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true,
            },
          },
          { transaction: t },
        ),
        queryInterface.createTable(
          'equipment_stage_translation',
          {
            equipment_stage_id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              unique: 'index',
              references: {
                model: 'equipment_stage',
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
        queryInterface.dropTable('equipment_stage_translation', {
          transaction: t,
        }),
        queryInterface.dropTable('equipment_stage', { transaction: t }),
      ]);
    });
  },
};
