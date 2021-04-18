const config = require('../config');
const { Router } = require('express');
const paginate = require('express-paginate');

const router = Router();

// Initialize Controller
const awardsController = require('../controllers/awardsController');

// Get All
router.get('/awards', paginate.middleware(10, 50), awardsController.all);

// Get One
router.get('/awards/:id', awardsController.show);

// List
router.get('/list/awards', awardsController.list);

// Create
router.post('/awards', config.isAuthenticated, awardsController.create);

// Update
router.put('/awards/:id', config.isAuthenticated, awardsController.update);

// Delete
router.delete('/awards/:id', config.isAuthenticated, awardsController.delete);

module.exports = router;
