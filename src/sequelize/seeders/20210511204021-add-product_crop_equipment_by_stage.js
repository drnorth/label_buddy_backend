'use strict';

const stage_equipment = [
  {
    id: 1,
    equip: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 2,
    equip: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 3,
    equip: [1, 2, 3],
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const product_crops = await queryInterface.sequelize.query(
      `SELECT * FROM "product_crop"`,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      },
    );

    return queryInterface.bulkInsert(
      'product_crop_equipment_by_stage',
      stage_equipment.reduce((acc, stage_equip) => {
        return [
          ...acc,
          ...product_crops.reduce((acc_prod_crop, product_crop) => {
            return [
              ...acc_prod_crop,
              ...stage_equip.equip.reduce((acc_equip, equip) => {
                return [
                  ...acc_equip,
                  {
                    equipment_stage_id: stage_equip.id,
                    equipment_id: equip,
                    crop_id: product_crop.crop_id,
                    product_id: product_crop.product_id,
                  },
                ];
              }, []),
            ];
          }, []),
        ];
      }, []),
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('product_crop');
  },
};
