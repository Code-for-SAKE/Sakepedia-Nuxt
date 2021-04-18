const config = require('../config');
const { Router } = require('express');
const paginate = require('express-paginate');

const router = Router();

// Initialize Controller
const breweriesController = require('../controllers/breweriesController');

// Get All
router.get('/breweries', paginate.middleware(10, 50), breweriesController.all);

// Get One
router.get('/breweries/:id', breweriesController.show);

// List
router.get('/list/breweries', breweriesController.list);

// Create
router.post('/breweries', config.isAuthenticated, breweriesController.create);

// Update
router.put(
  '/breweries/:id',
  config.isAuthenticated,
  breweriesController.update
);

// Delete
router.delete(
  '/breweries/:id',
  config.isAuthenticated,
  breweriesController.delete
);

module.exports = router;
