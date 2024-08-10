// backend/routes/user/activityRoutes.js

const express = require('express');
const router = express.Router();
const { getUserActivities } = require('../../controllers/user/activityController');
const { authMiddleware } = require('../../middlewares/authMiddleware');

// Get user activities (protected)
router.get('/', authMiddleware, getUserActivities);

module.exports = router;
