'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_crop_equipment_by_stage', {
      product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      crop_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: 'index',
      },
      equipment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: 'index',
        references: {
          model: 'equipment',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      equipment_stage_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: 'index',
        references: {
          model: 'equipment_stage',
          key: 'id',
        },
        onDelete: 'cascade',
      },
    });

    await queryInterface.sequelize.query(
      `ALTER TABLE "product_crop_equipment_by_stage" ADD CONSTRAINT "product_crop_fk" FOREIGN KEY ("product_id", "crop_id") REFERENCES "product_crop" ("product_id", "crop_id") ON UPDATE CASCADE ON DELETE CASCADE;`,
      {
        type: queryInterface.sequelize.QueryTypes.FOREIGNKEYS,
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product_crop_equipment_by_stage');
  },
};
