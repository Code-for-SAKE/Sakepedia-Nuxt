const config = require('../config');
const { Router } = require('express');

const router = Router();

// Initialize Controller
const analyticsController = require('../controllers/analyticsController');

// Update
router.get('/analytics/summary', analyticsController.summary);

module.exports = router;
