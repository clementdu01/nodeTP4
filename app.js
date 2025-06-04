// const express = require('express');
// const fs = require('node:fs');
//
// const app = express();
//
// app.use(express.json());
//
// app.get('/', (req, res) => {
//   res.send("Hello from the server");
// });
//
// const port = process.env.port || 3000;
//
// app.listen(port, () => {
//   console.log(`App running on port ${port}`);
// });
//
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
//
// const users = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/users.json`));
//
// const getAllTours = (req, res) => {
//   res.status(200).json({
//     status: "success",
//     results: tours.length,
//     data: { tours }
//   });
// };
//
// const getTourById = (req, res) => {
//   const id = req.params.id * 1;
//   const tour = tours.find(t => t.id === id);
//
//   if (!tour) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Aucun tour trouvé avec cet ID'
//     });
//   }
//
//   res.status(200).json({
//     status: 'success',
//     data: { tour }
//   });
// };
//
// const createTour = (req, res) => {
//   const newId = tours.length > 0 ? tours[tours.length - 1].id + 1 : 1;
//   const newTour = { id: newId, ...req.body };
//
//   tours.push(newTour);
//
//   fs.writeFileSync(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours, null, 4));
//
//   res.status(201).json({
//     status: 'success',
//     data: { tour: newTour }
//   });
// };
//
// const updateTour = (req, res) => {
//   const id = req.params.id * 1;
//   const tour = tours.find(t => t.id === id);
//
//   if (!tour) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Aucun tour trouvé avec cet ID'
//     });
//   }
//
//   const updatedTour = { ...tour, ...req.body };
//
//   tours[tours.indexOf(tour)] = updatedTour;
//
//   fs.writeFileSync(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours, null, 4));
//
//   res.status(200).json({
//     status: 'success',
//     data: { tour: updatedTour }
//   });
// };
//
// const deleteTour = (req, res) => {
//   const id = req.params.id * 1;
//   const tourIndex = tours.findIndex(t => t.id === id);
//
//   if (tourIndex === -1) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Aucun tour trouvé avec cet ID'
//     });
//   }
//
//   tours.splice(tourIndex, 1);
//
//   fs.writeFileSync(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours, null, 4));
//
//   res.status(204).json({
//     status: 'success',
//     data: null
//   });
// };
//
// function checkRequest(req, res, next) {
//   const { name, duration, description, difficulty, maxGroupSize } = req.body;
//
//   if (
//     typeof name !== 'string' ||
//     typeof duration !== 'string' ||
//     typeof description !== 'string' ||
//     typeof difficulty !== 'string' ||
//     typeof maxGroupSize !== 'number'
//   ) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Les types des champs sont invalides.'
//     });
//   }
//
//   if (!name || !duration || !description || !difficulty || !maxGroupSize) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Un des champs suivants est vide : (name, duration, description, difficulty, maxGroupSize)'
//     });
//   }
//
//   next();
// }
//
// const getAllUsers = (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: { users }
//
//   });
// }
//
// const createUser = (req, res) => {
//   const newUser = { ...req.body };
//
//   tours.push(newUser);
//
//   fs.writeFileSync(`${__dirname}/dev-data/data/users.json`, JSON.stringify(users, null, 4));
//
//   res.status(201).json({
//     status: 'success',
//     data: { user: newUser }
//   });
// }
//
// const getUserById = (req, res) => {
//   const id = req.params.id;
//   const user = users.find(u => u._id == id);
//
//   if (!user) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Aucun user trouvé avec cet ID'
//     });
//   }
//
//   res.status(200).json({
//     status: 'success',
//     data: { user }
//   });
// }
//
// const updateUser = (req, res) => {
//   const id = req.params.id;
//   const user = users.find(u => u._id == id);
//
//   if (!user) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Aucun user trouvé avec cet ID'
//     });
//   }
//
//   const updatedUser = { ...user, ...req.body };
//
//   users[users.indexOf(user)] = updatedUser;
//
//   fs.writeFileSync(`${__dirname}/dev-data/data/users.json`, JSON.stringify(users, null, 4));
//
//   res.status(200).json({
//     status: 'success',
//     data: { user: updatedUser }
//   });
// }
//
// const deleteUser = (req, res) => {
//   const id = req.params.id;
//   const userIndex = users.findIndex(u => u._id == id);
//
//   if (userIndex === -1) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Aucun user trouvé avec cet ID'
//     });
//   }
//
//   users.splice(userIndex, 1);
//
//   fs.writeFileSync(`${__dirname}/dev-data/data/users.json`, JSON.stringify(users, null, 4));
//
//   res.status(204).json({
//     status: 'success',
//     data: null
//   });
//
// }
//
// app
//   .route('/api/v1/tours')
//   .get(getAllTours)
//   .post(checkRequest, createTour);
//
// app
//   .route('/api/v1/tours/:id')
//   .get(getTourById)
//   .put(checkRequest, updateTour)
//   .delete(deleteTour);
//
// app
//   .route('/api/v1/users')
//   .get(getAllUsers)
//   .post(createUser);
//
// app
//   .route('/api/v1/users/:id')
//   .get(getUserById)
//   .put(updateUser)
//   .delete(deleteUser);


const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectString = process.env.Atlas_DATABASE;

const express = require('express');
const app = express();

app.use(express.json());

const tourRouter = require('./routes/tour.route');
const userRouter = require('./routes/user.route');

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

mongoose.connect(connectString)
  .then(() => {
    console.log("Connection to MongoDB has succeeded !!")
  })
  .catch(() => {
    console.log("Connection to MongoDB has failed")
  })

async function manageUser() {
  const UserModel = mongoose.model('User', new mongoose.Schema({ name: String }));

  const userDoc = new UserModel({ name: 'Foo' });
  await userDoc.save();

  const userFromDb = await UserModel.findOne({ name: 'Foo' });
  console.log(userFromDb);
}

manageUser().catch(err => console.error(err));
