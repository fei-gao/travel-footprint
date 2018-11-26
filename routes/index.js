const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', placeController.homePage);
// router.get('/places', catchErrors(placeController.getPlaces));
router.get('/add', placeController.addPlace);
// router.post('/add', catchErrors(placeController.createPlace));
// router.post('/add/:id', catchErrors(placeController.updatePlace));
// router.get('/places/:id/edit', catchErrors(placeController.editPlace));

module.exports = router;