const config = require('../config');
const { Router } = require('express');

const router = Router();

// Initialize Controller
const usersController = require('../controllers/usersController');

// Update
router.post('/users/:id/name', config.isAuthenticated, usersController.update);

module.exports = router;
