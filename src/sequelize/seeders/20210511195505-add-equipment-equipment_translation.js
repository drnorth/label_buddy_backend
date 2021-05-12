'use strict';

const equipment = [
  {
    id: 1,
    name: 'Long Trousers',
    img_url:
      'http://s1.iconbird.com/ico/2014/1/619/w128h1281390853817trousers128.png',
  },
  {
    id: 2,
    name: 'Long Sleeved Shirt',
    img_url:
      'https://cdn.iconscout.com/icon/premium/png-256-thumb/long-sleeve-t-shirt-2054449-1737708.png',
  },
  {
    id: 3,
    name: 'Sturdy Footwear (Boots)',
    img_url:
      'https://cdn.iconscout.com/icon/premium/png-256-thumb/boots-2390367-1996636.png',
  },
  {
    id: 4,
    name: 'Gloves (Chemically Resistant)',
    img_url:
      'https://cdn.iconscout.com/icon/premium/png-256-thumb/gloves-1733898-1475769.png',
  },
  {
    id: 5,
    name: 'Goggles',
    img_url:
      'https://cdn.iconscout.com/icon/free/png-256/goggles-1914493-1621955.png',
  },
  {
    id: 6,
    name: 'Face shield',
    img_url:
      'https://cdn.iconscout.com/icon/premium/png-256-thumb/face-shield-3232731-2696655.png',
  },
  {
    id: 7,
    name: 'Rubber Apron',
    img_url:
      'https://cdn.iconscout.com/icon/premium/png-256-thumb/apron-3467304-2899481.png',
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
    const added_equipment = await queryInterface.bulkInsert(
      'equipment',
      equipment.map((el) => {
        return { img_url: el.img_url };
      }),
      { returning: true },
    );

    return await queryInterface.bulkInsert(
      'equipment_translation',
      added_equipment.reduce((acc, el) => {
        return [
          ...acc,
          ...languages.map((language) => {
            return {
              equipment_id: el.id,
              language_code: language.code,
              name:
                language.code +
                '_' +
                equipment.find((equip) => equip.img_url === el.img_url).name,
            };
          }),
        ];
      }, []),
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('equipment');
  },
};
