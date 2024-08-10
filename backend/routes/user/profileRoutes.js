// backend/routes/user/profileRoutes.js

const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../../controllers/user/profileController');
const { authMiddleware } = require('../../middlewares/authMiddleware');

// Get user profile (protected)
router.get('/', authMiddleware, getUserProfile);

// Update user profile (protected)
router.put('/', authMiddleware, updateUserProfile);

module.exports = router;
