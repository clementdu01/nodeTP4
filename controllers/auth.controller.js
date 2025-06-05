const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (role === 'admin') {
      return res.status(403).json({
        status: 'fail',
        message: 'Vous ne pouvez pas créer un compte administrateur directement'
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      role: 'user'
    });

    const token = signToken(newUser._id, newUser.role);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
      role: role || 'admin'
    });

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Veuillez fournir un email et un mot de passe'
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Email ou mot de passe incorrect'
      });
    }

    const token = signToken(user._id, user.role);

    user.password = undefined;

    res.status(200).json({
      status: 'success',
      token,
      data: {
        userId: user._id,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
