'use strict';

const crops = [
  {
    name: 'chilli',
    img_url: 'https://findicons.com/files/icons/373/rave/256/hot_chili.png',
  },
  {
    name: 'apple',
    img_url: 'https://findicons.com/files/icons/339/coffee_break/128/apple.png',
  },
  {
    name: 'brihjal',
    img_url:
      'https://findicons.com/files/icons/1187/pickin_time/128/eggplant.png',
  },
  {
    name: 'cereals',
    img_url:
      'https://library.kissclipart.com/20180829/sse/kissclipart-wheat-icon-without-background-clipart-computer-ico-c3dd14cefb5c4609.jpg',
  },
  {
    name: 'cotton',
    img_url: 'https://static3.bigstockphoto.com/9/3/2/large2/239454148.jpg',
  },
  {
    name: 'cucumber',
    img_url:
      'https://media.istockphoto.com/vectors/cucumber-vector-id481564778?s=612x612',
  },
  {
    name: 'grapes',
    img_url:
      'https://findicons.com/files/icons/790/fruits_illustrated/128/grapes.png',
  },
  {
    name: 'okra',
    img_url:
      'https://toppng.com/uploads/preview/lady-finger-png-transparent-image-emerald-okra-100-seeds-spineless-115630469215u6lconvsz.png',
  },
  {
    name: 'pomegranate',
    img_url:
      'https://img1.pnghut.com/5/4/8/mLLLuSqTjF/ico-cranberry-superfood-food-raster-graphics.jpg',
  },
  {
    name: 'potato',
    img_url:
      'https://findicons.com/files/icons/1187/pickin_time/128/potato.png',
  },
  {
    name: 'rice',
    img_url:
      'https://icons.iconarchive.com/icons/google/noto-emoji-animals-nature/256/22333-sheaf-of-rice-icon.png',
  },
  {
    name: 'soybean',
    img_url:
      'https://icons.iconarchive.com/icons/iconicon/veggies/256/soybeans-icon.png',
  },
  {
    name: 'tomato',
    img_url: 'https://findicons.com/files/icons/2010/free_food/126/tomato.png',
  },
  {
    name: 'tea',
    img_url:
      'https://icons.iconarchive.com/icons/toma4025/tea/256/tea-plant-leaf-icon.png',
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
    const added_crops = await queryInterface.bulkInsert(
      'crop',
      crops.map((el) => {
        return { img_url: el.img_url };
      }),
      { returning: true },
    );

    return await queryInterface.bulkInsert(
      'crop_translation',
      added_crops.reduce((acc, el) => {
        return [
          ...acc,
          ...languages.map((language) => {
            return {
              crop_id: el.id,
              language_code: language.code,
              name:
                language.code +
                '_' +
                crops.find((crop) => crop.img_url === el.img_url).name,
            };
          }),
        ];
      }, []),
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('crop', {});
  },
};
