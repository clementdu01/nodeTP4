const express = require('express');
const tourController = require('../controllers/tour.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route('/')
  .get(tourController.getAllTours);

router
  .route('/:id')
  .get(tourController.getTourById);

router.use(authMiddleware.verifyToken);

router
  .route('/tour-stats')
  .get(tourController.getToursStats);

router.use(authMiddleware.restrictTo('admin', 'moderator'));

router
  .route('/')
  .post(tourController.validateTour, tourController.createTour);

router
  .route('/:id')
  .put(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
