const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(placeController.homePage));
router.get('/places', catchErrors(placeController.getPlaces));
// show single place
router.get('/places/:id', catchErrors(placeController.getPlaceById));
// create a new place
router.get('/add', placeController.addPlace);
router.post('/add',
  placeController.upload,
  catchErrors(placeController.resize),
  catchErrors(placeController.createPlace)
);

// update a place
router.get('/places/:id/edit', catchErrors(placeController.editPlace));
router.post('/add/:id',
  placeController.upload,
  catchErrors(placeController.resize),
  catchErrors(placeController.updatePlace)
);

module.exports = router;