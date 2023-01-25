const recipeSchema = require('../schema/recipes');
const Recipe = require('../schema/recipes');

function convertCodes(req, res, next) {
  const countrySwitch = {
    US: 'American',
    GB: 'British',
    CA: 'Canadian',
    CN: 'Chinese',
    HR: 'Croatian',
    NL: 'Dutch',
    EG: 'Egyptian',
    FR: 'French',
    GR: 'Greek',
    IN: 'Indian',
    IE: 'Irish',
    IT: 'Italian',
    JM: 'Jamaican',
    JP: 'Japanese',
    KE: 'Kenyan',
    MY: 'Malaysian',
    MX: 'Mexican',
    MA: 'Moroccan',
    PL: 'Polish',
    PT: 'Portuguese',
    RU: 'Russian',
    ES: 'Spanish',
    TH: 'Thai',
    TN: 'Tunisian',
    TR: 'Turkish',
    VN: 'Vietnamese',
  };
  if (req.query.strArea) {
    const codes = req.query.strArea.map((code) => countrySwitch[code]);
    console.log(codes);
    req.query.strArea = { $in: codes };
  }
  next();
}

module.exports = {
  convertCodes,
};
