'use strict';

const equipment_stages = [
  {
    id: 1,
    name: 'Mixing & Loading',
  },
  {
    id: 2,
    name: 'Application',
  },
  {
    id: 3,
    name: 'Re-entry',
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const languages = await queryInterface.sequelize.query(
      `SELECT * FROM "language"`,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      },
    );
    const added_equipment_stages = await queryInterface.bulkInsert(
      'equipment_stage',
      equipment_stages.map((el) => {
        return { id: el.id };
      }),
      { returning: true },
    );

    return await queryInterface.bulkInsert(
      'equipment_stage_translation',
      added_equipment_stages.reduce((acc, el) => {
        return [
          ...acc,
          ...languages.map((language) => {
            return {
              equipment_stage_id: el.id,
              language_code: language.code,
              name:
                language.code +
                '_' +
                equipment_stages.find((equip_stage) => equip_stage.id === el.id)
                  .name,
            };
          }),
        ];
      }, []),
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('equipment_stage');
  },
};
