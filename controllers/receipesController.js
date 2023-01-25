const BreedsModel = require('../models/breedsModel');

const getBreeds = async (req, res) => {
    try {
        const query = req.query;
        const allBreeds = await BreedsModel.readAllBreedsModel(query);

        res.send({
            data: allBreeds
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const getBreed = async (req, res) => {
    try {
        const { breedId } = req.params;
        const breed = await BreedsModel.readBreedModel(breedId);

        res.send({
            data: breed
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const addBreed = async (req, res) => {
    try {
        const newBreed = req.body;
        const breedAdded = await BreedsModel.addBreedModel(newBreed);
        console.log('updateBreedController', breedAdded)
        if (breedAdded) {
            res.send({
                data: breedAdded
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const editBreed = async (req, res) => {
    try {
        const updatedBreed = req.body;
        const updated = await BreedsModel.editBreedModel(req.params.breedId, updatedBreed);

        res.send({
            data: updated
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function deleteBreed(req, res) {
    const { breedId } = req.params;
    const deleted = await BreedsModel.deleteBreedModel(breedId);
    if (deleted) {
        res.send({ ok: true, deletedId: breedId });
    }
}

module.exports = { addBreed, getBreeds, getBreed, editBreed, deleteBreed }