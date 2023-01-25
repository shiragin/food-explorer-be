const express = require('express');
const { getRecipes } = require('../controllers/recipesController');
const { convertCodes } = require('../middlewares/recipesMiddleware');

const router = express.Router();

router.get('/', convertCodes, getRecipes);

module.exports = router;
