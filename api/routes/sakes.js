const config = require('../config');
const { Router } = require('express');
const paginate = require('express-paginate');

const router = Router();

// Initialize Controller
const sakesController = require('../controllers/sakesController');

// Get All
router.get('/sakes', paginate.middleware(10, 50), sakesController.all);

// Get One
router.get('/sakes/:id', sakesController.show);

// List
router.get('/list/sakes', sakesController.list);

// Create
router.post('/sakes', config.isAuthenticated, sakesController.create);

// Update
router.put('/sakes/:id', config.isAuthenticated, sakesController.update);

// Delete
router.delete('/sakes/:id', config.isAuthenticated, sakesController.delete);

//change
router.get('/change/sakes', sakesController.change);

module.exports = router;
