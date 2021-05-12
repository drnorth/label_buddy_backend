'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('language', {
      code: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      title: { type: Sequelize.DataTypes.STRING },
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('language');
  },
};
