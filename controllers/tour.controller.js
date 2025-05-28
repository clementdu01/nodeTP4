const tourService = require('../services/tour.service');
const { Tour } = require('../models/tour.model');
const APIfeatures = require('../api/APIfeatures');

exports.validateTour = (req, res, next) => {
  const { name, duration, description, difficulty, maxGroupSize } = req.body;

  if (!name || !duration || !description || !difficulty || !maxGroupSize) {
    return res.status(400).json({
      status: 'fail',
      message: 'Un des champs suivants est vide : (name, duration, description, difficulty, maxGroupSize)'
    });
  }

  // if (
  //   typeof name !== 'string' ||
  //   typeof duration !== 'string' ||
  //   typeof description !== 'string' ||
  //   typeof difficulty !== 'string' ||
  //   typeof maxGroupSize !== 'number'
  // ) {
  //   return res.status(400).json({
  //     status: 'fail',
  //     message: 'Les types d\'un ou plusieurs champs sont invalides.'
  //   });
  // }

  next();
};

// exports.aliasTopTours = (req, res, next) => {
//   if (!req.query) req.query = {};
//   req.query.limit = '5';
//   req.query.sort = 'price';
//   console.log('Middleware aliasTopTours activé:', { limit: req.query.limit, sort: req.query.sort });
//   next();
// };
//
//
exports.getAllTours = async (req, res) => {
  try {
    const features = new APIfeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.aliasTopTours = (req, res, next) => {
  if (!req.params) req.params = {};
  req.params.limit = '5';
  req.params.sort = 'price';
  console.log('Middleware aliasTopTours activé:', { limit: req.params.limit, sort: req.params.sort });
  next();
};

exports.getAllToursParams = async (req, res) => {
  try {
    console.log('Params initiaux:', req.params);

    const queryObj = { ...req.params };
    const excludedFields = ['sort', 'page', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    const filters = {};
    Object.keys(queryObj).forEach(key => {
      const match = key.match(/(.*)\[(gte|gt|lte|lt)\]/);
      if (match) {
        const field = match[1];
        const operator = `$${match[2]}`;
        if (!filters[field]) filters[field] = {};
        filters[field][operator] = Number(req.params[key]);
      } else {
        filters[key] = req.params[key];
      }
    });

    console.log('\\Filtres appliqués :', filters);

    let query = Tour.find(filters);

    if (req.params.sort) {
      const sortBy = req.params.sort.split(',').join(' ');
      query = query.sort(sortBy);
    }

    if (req.params.limit) {
      query = query.limit(Number(req.params.limit));
    }

    console.log('Tri appliqué:', req.params.sort);
    console.log('Limite appliquée:', req.params.limit);

    const tours = await query;

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
    const tour = await Tour.findOne({ _id: req.params.id });
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

exports.createTour = (req, res) => {
  // const newTour = tourService.createTour(req.body);
  // res.status(201).json({
  //   status: 'success',
  //   data: { tour: newTour }
  // });
  const tour = new Tour({
    ...req.body
  });
  tour.save()
    .then(() => res.status(201).json({ message: 'Tour enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
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
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
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
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gt: 4.5 } }
      },
      {
        $group: {
          _id: '$difficulty',
          numTours: { $sum: 1 },
          avgRating: { $avg: '$ratingsAverage' },
          numRatings: { $sum: '$ratingsQuantity' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
          avgPrice: { $avg: '$price' }
        }
      },
      {
        $sort: { avgPrice: 1 }
      }
    ]);

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