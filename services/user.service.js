const User = require('../models/user.model');

exports.getAllUsers = async () => {
  return await User.find();
};

exports.getUserById = async (id) => {
  return await User.findById(id);
};

exports.createUser = async (data) => {
  const user = new User(data);
  return await user.save();
};

exports.updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
};

exports.deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  return !!user;
};
