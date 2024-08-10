// backend/routes/admin/authRoutes.js

const express = require('express');
const router = express.Router();
const { loginAdmin, getAdminProfile } = require('../../controllers/admin/authController');
const { adminMiddleware } = require('../../middlewares/adminMiddleware');

// Ensure these controller functions are imported correctly
router.post('/login', loginAdmin);
router.get('/profile', adminMiddleware, getAdminProfile);

module.exports = router;
