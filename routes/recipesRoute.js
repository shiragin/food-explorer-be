const express = require('express');
const { getRecipes } = require('../controllers/recipesController');
const { convertCodes } = require('../middlewares/recipesMiddleware');
const Recipe = require('../schema/recipes');

const router = express.Router();

router.get('/', convertCodes, getRecipes);

router.get('/:id', async (req, res) => {
    console.log(req.params, 'hey look at me')
    try {
        const params = req.params;

        const recipes = await Recipe.find({ "idMeal": params.id });
        console.log(recipes, 'hey look at me im ms meeskes');

        res.send({
            ok: true,
            data: recipes,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


module.exports = router;
