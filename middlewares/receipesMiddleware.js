const Ajv = require('ajv');
const ajv = new Ajv();
const BreedsModel = require('../models/breedsModel');

const isValidId = async (req, res, next) => {
    const { breedId } = req.params;
    const breed = await BreedsModel.readBreedModel(breedId);
    if (!breed) {
        res.status(400).send('There is no existing breed selected');
        return;
    }
    next();
}

const isNewBreed = async (req, res, next) => {
    const { breedId } = req.params;
    const { specieId, breedName } = req.body;
    const breed = await BreedsModel.isNewBreedModel(breedName, specieId, breedId);
    if (breed) {
        res.status(400).send('Breed already exists');
        return;
    }
    next();
};

module.exports = { isNewBreed, isValidId };