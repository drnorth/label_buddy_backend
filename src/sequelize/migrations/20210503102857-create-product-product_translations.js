'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable(
          'product',
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
          'product_translation',
          {
            product_id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              allowNull: false,
              unique: 'index',
              references: {
                model: 'product',
                key: 'id',
              },
              onDelete: 'cascade',
            },
            language_code: {
              type: Sequelize.STRING,
              primaryKey: true,
              allowNull: false,
              unique: 'index',
              references: {
                model: 'language',
                key: 'code',
              },
              onDelete: 'cascade',
            },
            name: { type: Sequelize.STRING },
            desc: { type: Sequelize.STRING },
          },
          { transaction: t },
        ),
      ]);
    });
  },

  down: async (queryInterface) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable('product_translation', { transaction: t }),
        queryInterface.dropTable('product', { transaction: t }),
      ]);
    });
  },
};
