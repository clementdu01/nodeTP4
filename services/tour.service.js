const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllTours = () => tours;

exports.getTourById = (id) => tours.find(t => t.id === parseInt(id));

exports.createTour = (data) => {
  const newId = tours.length > 0 ? tours[tours.length - 1].id + 1 : 1;
  const newTour = { id: newId, ...data };
  tours.push(newTour);
  fs.writeFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours, null, 4));
  return newTour;
};

exports.updateTour = (id, data) => {
  const tour = tours.find(t => t.id === parseInt(id));
  if (!tour) return null;
  const updatedTour = { ...tour, ...data };
  tours[tours.indexOf(tour)] = updatedTour;
  fs.writeFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours, null, 4));
  return updatedTour;
};

exports.deleteTour = (id) => {
  const index = tours.findIndex(t => t.id === parseInt(id));
  if (index === -1) return false;
  tours.splice(index, 1);
  fs.writeFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours, null, 4));
  return true;
};