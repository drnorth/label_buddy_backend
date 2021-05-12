'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_crop', {
      product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: 'product_crop',
        references: {
          model: 'product',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      crop_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: 'product_crop',
        references: {
          model: 'crop',
          key: 'id',
        },
        onDelete: 'cascade',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product_crop');
  },
};
