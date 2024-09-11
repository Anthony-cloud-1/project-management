/**
 * Dashboard router
 */

const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { getDashboardData } = require('../controllers/dashboardController');

// Get dashboard data
router.get('/dashboard', auth, getDashboardData);

module.exports = router;