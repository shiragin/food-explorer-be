const express = require('express');
const ReceipesController = require('../controllers/receipesController');
const ReceipesMiddleware = require('../middlewares/receipesMiddleware');
const GlobalMiddleware = require('../middlewares/globalMiddleware');
const { receipesSchema } = require('../schemas/receipesSchema');

const router = express.Router();

///Add Validation Middleware to POST/PUT routes

router.get('/',
    ReceipesController.getReceipes,
);

router.get('/:breedId',
    GlobalMiddleware.auth,
    ReceipesController.getBreed
);

router.post('/',
    GlobalMiddleware.validateBody(receipesSchema),
    GlobalMiddleware.auth,
    ReceipesMiddleware.isNewBreed,
    ReceipesController.addBreed
);

router.put('/:breedId',
    GlobalMiddleware.validateBody(receipesSchema),
    GlobalMiddleware.auth,
    ReceipesMiddleware.isValidId,
    ReceipesMiddleware.isNewBreed,
    ReceipesController.editBreed
);

router.delete('/:breedId',
    GlobalMiddleware.auth,
    ReceipesController.deleteBreed
);

module.exports = router;