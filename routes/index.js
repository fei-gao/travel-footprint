const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(placeController.homePage));
router.get('/places', catchErrors(placeController.getPlaces));

// create a new place
router.get('/add', placeController.addPlace);
router.post('/add', catchErrors(placeController.createPlace));

// update a place
router.post('/add/:id', catchErrors(placeController.updatePlace));
router.get('/places/:id/edit', catchErrors(placeController.editPlace));

module.exports = router;