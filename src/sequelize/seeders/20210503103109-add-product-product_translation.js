'use strict';

const products = [
  {
    name: 'Movento',
    img_url:
      'https://5.imimg.com/data5/SELLER/Default/2021/1/KT/JH/IH/5111461/bayer-movento-od-500-ml-2-way-systemic-insecticide-500x500.jpg',
    desc: `Spirotetramat 150 OD Movento is Bayer’s new standard for long duration control of hidden sucking pests. Its key active ingredient …`,
  },
  {
    name: 'Admire',
    img_url:
      'https://5.imimg.com/data5/SELLER/Default/2021/3/NB/KH/ND/5111461/admire-insecticide-500x500.jpg',
    desc: `Imidacloprid 70 WG (70% w/w) Admire contains Imidacloprid, one of the world&#39;s best selling insecticides. It is a systemic insecticide …`,
  },
  {
    name: 'Alion plus',
    img_url:
      'https://5.imimg.com/data5/YD/VF/GD/SELLER-5111461/bayer-alion-plus-herbicide-500x500.png',
    desc: `Indaziflam 20 + Glyphosate IPA 540 SC (1.65% w/w + 44.63% w/w) Long lasting Alion® Plus herbicide provides a new solution for foliar and …`,
  },
  {
    name: 'Antracol',
    img_url:
      'https://5.imimg.com/data5/SELLER/Default/2021/3/QR/UH/HL/5111461/antracol-fungicide-500x500.jpg',
    desc: `Antracol contains Propineb, a contact fungicide with broad spectrum activity against various diseases of rice, chilli, grapes, potato and other…`,
  },
  {
    name: 'Confidor Super',
    img_url:
      'https://5.imimg.com/data5/SELLER/Default/2021/3/GT/GR/RP/5111461/confidor-super-insecticide-500x500.jpg',
    desc: `Imidacloprid 350 SC (30.5% w/w) Confidor Super combines the proven properties of Imidacloprid, one of the world's best selling insecticides …`,
  },
  {
    name: 'Council activ',
    img_url:
      'https://5.imimg.com/data5/SELLER/Default/2021/3/JZ/LM/UY/5111461/council-activ-herbicide-500x500.jpg',
    desc: `Triafamone 20% + Ethoxysulfuron 10% WG Council® activ is the latest post emergent Rice herbicide that offers highly effective weed control resulting ..`,
  },
  {
    name: 'Infinito',
    img_url:
      'https://5.imimg.com/data5/SELLER/Default/2021/3/VD/NX/AY/5111461/infinito-fungicide-500x500.jpg',
    desc: `Fluopicolide 5.56% w/w + Propamocarb Hydrochloride 55.6% w/w SC Infinito is a modern fungicide that has a very strong translaminar effect based ..`,
  },
  {
    name: 'Laudis',
    img_url:
      'https://5.imimg.com/data5/SELLER/Default/2021/3/BF/ZK/ET/5111461/laudis-herbicide-500x500.jpg',
    desc: `Tembotrione 42% SC (34.4% w/w) Laudis is a broad spectrum post emergence herbicide recommended for use along with surfactant for ..`,
  },
  {
    name: 'Luna Experience',
    img_url:
      'https://5.imimg.com/data5/SELLER/Default/2021/3/FE/XE/IT/5111461/luna-experience-fungicide-500x500.jpg',
    desc: `Fluopyram 17.7%+ Tebuconazole17.7% w/w SC (400 SC) Luna Experience offers a new way to protect plants against diseases ..`,
  },
  {
    name: 'Nativo',
    img_url:
      'https://5.imimg.com/data5/SELLER/Default/2021/3/PC/DC/MW/5111461/nativo-fungicide-500x500.jpg',
    desc: `Tebuconazole 50%+ Trifloxystrobin 25% w/w WG (75 WG) Nativo is a new combination fungicide containing Tebuconazole ..`,
  },
  {
    name: 'Sunrice',
    img_url:
      'https://5.imimg.com/data5/SELLER/Default/2021/3/BF/CH/TJ/5111461/sunrice-herbicide-500x500.jpg',
    desc: `Ethoxysulfuron 15% WDG Sunrice is a post-emergent broad spectrum herbicide very effective for the control of sedges and broad ..`,
  },
  {
    name: 'Solomon',
    img_url:
      'https://5.imimg.com/data5/DT/HY/ZV/GLADMIN-3061/solomon-insecticide-1-l-500x500.jpg',
    desc: `Beta-Cyfluthrin + Imidacloprid 300 OD (8.49 + 19.81 % w/w) Solomon contains time tested Imidacloprid and Beta- Cyfluthrin in an innovative ..`,
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const added_products = await queryInterface.bulkInsert(
      'product',
      products.map((el) => {
        return { img_url: el.img_url };
      }),
      { returning: true },
    );
    const languages = await queryInterface.sequelize.query(
      `SELECT * FROM "language"`,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      },
    );
    return await queryInterface.bulkInsert(
      'product_translation',
      added_products.reduce((acc, el) => {
        return [
          ...acc,
          ...languages.map((language) => {
            return {
              product_id: el.id,
              language_code: language.code,
              name:
                language.code +
                '_' +
                products.find((product) => product.img_url === el.img_url).name,
              desc:
                language.code +
                '_' +
                products.find((product) => product.img_url === el.img_url).desc,
            };
          }),
        ];
      }, []),
      { returning: true },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('product');
  },
};
