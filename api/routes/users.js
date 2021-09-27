const config = require('../config');
const { Router } = require('express');

const router = Router();

// Initialize Controller
const usersController = require('../controllers/usersController');

// Update
router.get('/users/:id/name', config.isAuthenticated, usersController.show);
router.post('/users/:id/name', config.isAuthenticated, usersController.update);
router.get(
  '/users/:id/contribute',
  config.isAuthenticated,
  usersController.contribute
);

module.exports = router;
