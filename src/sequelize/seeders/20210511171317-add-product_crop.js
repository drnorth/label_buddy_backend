'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = await queryInterface.sequelize.query(
      `SELECT * FROM "product"`,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      },
    );
    const crops = await queryInterface.sequelize.query(`SELECT * FROM "crop"`, {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });

    return queryInterface.bulkInsert(
      'product_crop',
      products.reduce((acc, product) => {
        return [
          ...acc,
          ...crops.map((crop) => {
            return { crop_id: crop.id, product_id: product.id };
          }),
        ];
      }, []),
      { returning: true },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('product_crop');
  },
};
