const express = require('express');
const { getRecipes } = require('../controllers/recipesController');
const { auth } = require('../middlewares/globalMiddleware');
const { convertCodes } = require('../middlewares/recipesMiddleware');

const Recipe = require('../schema/recipes');

const router = express.Router();

router.get('/', convertCodes, getRecipes);

router.get('rate/:id', auth, async (req, res) => {
    console.log(req.params, 'hey look at me')
    try {
        const { id } = req.params;
        console.log("this is the id", id);

        // const recipe = await Recipe.find({ "reviews.user": userId }).populate("reviews.user");
        // console.log(recipes, 'hey look at me im ms meeskes');

        const userId = user.id;
        const recipe = await Recipe.findOne({ "reviews": { "$elemMatch": { "user": userId } } });

        res.send({
            ok: true,
            data: recipes,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get(':id', async (req, res) => {
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
