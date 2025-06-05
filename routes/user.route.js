const express = require('express');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.use(authMiddleware.verifyToken);

router
  .route('/')
  .get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUserById);

router.use(authMiddleware.restrictTo('admin'));

router.post('/admin', authController.createAdmin);

router
  .route('/')
  .post(userController.createUser);

router
  .route('/:id')
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
