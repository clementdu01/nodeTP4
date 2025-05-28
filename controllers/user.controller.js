const userService = require('../services/user.service');

exports.getAllUsers = (req, res) => {
  const users = userService.getAllUsers();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users }
  });
};

exports.getUserById = (req, res) => {
  const user = userService.getUserById(req.params.id);
  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'Aucun utilisateur trouvé avec cet ID'
    });
  }
  res.status(200).json({
    status: 'success',
    data: { user }
  });
};

exports.createUser = (req, res) => {
  const newUser = userService.createUser(req.body);
  res.status(201).json({
    status: 'success',
    data: { user: newUser }
  });
};

exports.updateUser = (req, res) => {
  const updatedUser = userService.updateUser(req.params.id, req.body);
  if (!updatedUser) {
    return res.status(404).json({
      status: 'fail',
      message: 'Aucun utilisateur trouvé avec cet ID'
    });
  }
  res.status(200).json({
    status: 'success',
    data: { user: updatedUser }
  });
};

exports.deleteUser = (req, res) => {
  const success = userService.deleteUser(req.params.id);
  if (!success) {
    return res.status(404).json({
      status: 'fail',
      message: 'Aucun utilisateur trouvé avec cet ID'
    });
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
};