const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(placeController.homePage));
router.get('/places', catchErrors(placeController.getPlaces));
// show single place
router.get('/places/:id', catchErrors(placeController.getPlaceById));
// create a new place
router.get('/add',
  authController.isLoggedIn,
  placeController.addPlace);
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

router.get('/tags', catchErrors(placeController.getPlacesByTag));
router.get('/tags/:tag', catchErrors(placeController.getPlacesByTag));

router.get('/login', userController.loginForm);
router.post('/login', authController.login);

router.get('/register', userController.registerForm);

// 1. validate the registration data
// 2. register the user
// 3. we need log them in
router.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login
);

router.get('/logout', authController.logout);
module.exports = router;