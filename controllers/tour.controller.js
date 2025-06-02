const tourService = require('../services/tour.service');

exports.validateTour = (req, res, next) => {
  const { name, duration, description, difficulty, maxGroupSize } = req.body;

  if (!name || !duration || !description || !difficulty || !maxGroupSize) {
    return res.status(400).json({
      status: 'fail',
      message: 'Un des champs suivants est vide : (name, duration, description, difficulty, maxGroupSize)'
    });
  }

  next();
};

exports.aliasTopTours = (req, res, next) => {
  if (!req.query) req.query = {};
  req.query.limit = '5';
  req.query.sort = 'price';
  console.log('Middleware aliasTopTours activé:', { limit: req.query.limit, sort: req.query.sort });
  next();
};


exports.getAllTours = async (req, res) => {
  try {
    const tours = await tourService.getAllTours(req.query);
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.getTourById = async (req, res) => {
  try {
    const tour = await tourService.getTourById(req.params.id);
    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Aucun tour trouvé avec cet ID'
      });
    }
    res.status(200).json({
      status: 'success',
      data: { tour }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await tourService.createTour(req.body);
    res.status(201).json({
      status: 'success',
      data: { tour: newTour }
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await tourService.updateTour(req.params.id, req.body);
    if (!updatedTour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Aucun tour trouvé avec cet ID'
      });
    }
    res.status(200).json({
      status: 'success',
      data: { tour: updatedTour }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const deletedTour = await tourService.deleteTour(req.params.id);
    if (!deletedTour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Aucun tour trouvé avec cet ID'
      });
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.getToursStats = async (req, res) => {
  try {
    const stats = await tourService.getToursStats();
    res.status(200).json({
      status: 'success',
      data: stats
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message
    });
  }
};