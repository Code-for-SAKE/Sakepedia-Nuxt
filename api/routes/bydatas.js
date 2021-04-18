const config = require('../config');
const { Router } = require('express');
const paginate = require('express-paginate');

const router = Router();

// Initialize Controller
const breweryYearDatasController = require('../controllers/breweryYearDatasController');

// Get All
router.get(
  '/bydatas',
  paginate.middleware(10, 50),
  breweryYearDatasController.all
);

// Get One
router.get('/bydatas/:id', breweryYearDatasController.show);

// List
router.get('/list/bydatas', breweryYearDatasController.list);

// Create
router.post(
  '/bydatas',
  config.isAuthenticated,
  breweryYearDatasController.create
);

// Update
router.put(
  '/bydatas/:id',
  config.isAuthenticated,
  breweryYearDatasController.update
);

// Delete
router.delete(
  '/bydatas/:id',
  config.isAuthenticated,
  breweryYearDatasController.delete
);

module.exports = router;
