const express = require('express');
const tourController = require('../controllers/tour.controller');

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route('/tour-stats')
  .get(tourController.getToursStats);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.validateTour, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTourById)
  .put(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;