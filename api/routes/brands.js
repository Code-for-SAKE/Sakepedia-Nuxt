const config = require('../config');
const { Router } = require('express');
const paginate = require('express-paginate');

const router = Router();

// Initialize Controller
const brandsController = require('../controllers/brandsController');

// Get All
router.get('/brands', paginate.middleware(10, 50), brandsController.all);

// Get One
router.get('/brands/:id', brandsController.show);

// List
router.get('/list/brands', brandsController.list);

// Create
router.post('/brands', config.isAuthenticated, brandsController.create);

// Update
router.put('/brands/:id', config.isAuthenticated, brandsController.update);

// Delete
router.delete('/brands/:id', config.isAuthenticated, brandsController.delete);

module.exports = router;
