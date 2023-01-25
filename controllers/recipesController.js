const { str } = require('ajv');
const Recipe = require('../schema/recipes');

async function getRecipes(req, res) {
  console.log('hii', req.query);
  try {
    const query = req.query;
    const recipes = await Recipe.find(query);
    console.log(recipes);

    res.send({
      ok: true,
      data: recipes,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

module.exports = { getRecipes };
