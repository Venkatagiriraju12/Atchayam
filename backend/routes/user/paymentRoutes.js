// backend/routes/user/paymentRoutes.js

const express = require('express');
const router = express.Router();
const { createPayment, verifyPayment } = require('../../controllers/user/paymentController');
const { authMiddleware } = require('../../middlewares/authMiddleware');

// Create a new payment (protected)
router.post('/create', authMiddleware, createPayment);

// Verify payment (protected)
router.post('/verify', authMiddleware, verifyPayment);

module.exports = router;
