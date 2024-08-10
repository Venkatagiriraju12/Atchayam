// backend/routes/admin/dashboardRoutes.js

const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../../controllers/admin/dashboardController');
const { adminMiddleware } = require('../../middlewares/adminMiddleware');

// Get dashboard statistics (protected)
router.get('/stats', adminMiddleware, getDashboardStats);

module.exports = router;
