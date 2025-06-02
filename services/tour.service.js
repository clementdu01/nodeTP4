const { Tour } = require('../models/tour.model');
const APIfeatures = require('../api/APIfeatures');

exports.getAllTours = async (query) => {
  const features = new APIfeatures(Tour.find(), query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  return await features.query;
};

exports.getTourById = async (id) => {
  return await Tour.findById(id);
};

exports.createTour = async (data) => {
  const tour = new Tour(data);
  return await tour.save();
};

exports.updateTour = async (id, data) => {
  return await Tour.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
};

exports.deleteTour = async (id) => {
  return await Tour.findByIdAndDelete(id);
};

exports.getToursStats = async () => {
  return await Tour.aggregate([
    { $match: { ratingsAverage: { $gt: 4.5 } } },
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
    { $sort: { avgPrice: 1 } }
  ]);
};