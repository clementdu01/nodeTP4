const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Tour } = require('./models/tour.model');

dotenv.config();

const connectString = process.env.LOCAL_DATABASE;

mongoose.connect(connectString)
  .then(() => {
    console.log("Connection to MongoDB has succeeded !!")
  })
  .catch(() => {
    console.log("Connection to MongoDB has failed")
  })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'));

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Données importées avec succès !');
    process.exit();
  } catch (err) {
    console.error('Erreur lors de l\'importation des données :', err);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Données supprimées avec succès !');
    process.exit();
  } catch (err) {
    console.error('Erreur lors de la suppression des données :', err);
    process.exit(1);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('Argument non valide. Utilisez "--import" ou "--delete".');
  process.exit();
}