const fs = require('fs');
const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));

exports.getAllUsers = () => users;

exports.getUserById = (id) => users.find(u => u._id === id);

exports.createUser = (data) => {
  const newUser = { ...data };
  users.push(newUser);
  fs.writeFileSync(`${__dirname}/../dev-data/data/users.json`, JSON.stringify(users, null, 4));
  return newUser;
};

exports.updateUser = (id, data) => {
  const user = users.find(u => u._id === id);
  if (!user) return null;
  const updatedUser = { ...user, ...data };
  users[users.indexOf(user)] = updatedUser;
  fs.writeFileSync(`${__dirname}/../dev-data/data/users.json`, JSON.stringify(users, null, 4));
  return updatedUser;
};

exports.deleteUser = (id) => {
  const index = users.findIndex(u => u._id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  fs.writeFileSync(`${__dirname}/../dev-data/data/users.json`, JSON.stringify(users, null, 4));
  return true;
};